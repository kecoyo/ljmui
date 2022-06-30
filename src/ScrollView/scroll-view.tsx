import React, { ReactNode, forwardRef, FC, useRef, useState, useImperativeHandle } from 'react';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import { NativeProps, withNativeProps } from 'antd-mobile/es/utils/native-props';
import classNames from 'classnames';
import { useMount, useMemoizedFn } from 'ahooks';
import BScroll from 'better-scroll';
import { DotLoading, SpinLoading, Empty } from 'antd-mobile';

const classPrefix = `ljmui2-scroll-view`;

export type ScrollViewRef = {
  bscroll?: BScroll;
};

export type ScrollViewProps = {
  direction?: 'vertical' | 'horizontal';
  onScroll?: (e: { x: number; y: number }) => void;
  onPullDownRefresh?: () => void;
  onPullUpLoad?: () => void;
  loading?: boolean;
  hasMore?: boolean;
  isEmpty?: boolean;
  children: ReactNode;
} & NativeProps;

const defaultProps = {
  direction: 'vertical',
  scrollbar: false,
};

const TIME_BOUNCE = 800;

export const ScrollView = forwardRef<ScrollViewRef, ScrollViewProps>((p, ref) => {
  const props: ScrollViewProps = mergeProps(defaultProps, p);
  const divRef = useRef<HTMLDivElement>(null);
  const [bscroll, setBScroll] = useState<BScroll>();
  const [beforePullDown, setBeforePullDown] = useState(true);
  const [isPullingDown, setIsPullingDown] = useState(false);
  const [isPullUpLoad, setIsPullUpLoad] = useState(false);

  // 检测是否可以下拉
  const checkPullDown = useMemoizedFn(() => {
    return !!props.onPullDownRefresh && !props.loading;
  });

  // 检测是否可以上拉
  const checkPullUp = useMemoizedFn(() => {
    return !!props.onPullUpLoad && !props.loading && props.hasMore;
  });

  useMount(() => {
    if (divRef && divRef.current) {
      const { onPullDownRefresh, onPullUpLoad, ...otherProps } = props;
      let bscroll: BScroll = new BScroll(divRef.current, {
        scrollX: props.direction === 'horizontal',
        scrollY: props.direction === 'vertical',
        probeType: 3,
        mouseWheel: true,
        click: false,
        preventDefault: false,
        observeDOM: true,
        observeImage: true,
        pullDownRefresh: props.onPullDownRefresh ? {} : undefined,
        pullUpLoad: props.onPullUpLoad ? {} : undefined,
        ...otherProps,
      });

      const pullingDownHandler = async () => {
        if (checkPullDown()) {
          setBeforePullDown(false);
          setIsPullingDown(true);

          if (props.onPullDownRefresh) {
            await props.onPullDownRefresh();
          }

          setIsPullingDown(false);
          bscroll.finishPullDown();

          setTimeout(() => {
            bscroll.refresh();
            setBeforePullDown(true);
          }, TIME_BOUNCE + 100);
        } else {
          bscroll.finishPullDown();
        }
      };

      const pullingUpHandler = async () => {
        if (checkPullUp()) {
          setIsPullUpLoad(true);

          if (props.onPullUpLoad) {
            await props.onPullUpLoad();
          }

          bscroll.finishPullUp();
          bscroll.refresh();
          setIsPullUpLoad(false);
        } else {
          bscroll.finishPullUp();
        }
      };

      !!props.onPullDownRefresh && bscroll.on('pullingDown', pullingDownHandler);
      !!props.onPullUpLoad && bscroll.on('pullingUp', pullingUpHandler);
      !!props.onScroll && bscroll.on('scroll', props.onScroll);

      setBScroll(bscroll);
    }
  });

  useImperativeHandle(ref, () => ({
    bscroll: bscroll,
  }));

  return withNativeProps(
    props,
    <div ref={divRef} className={classNames(classPrefix, `${classPrefix}-${props.direction}`, {})}>
      <div className={`${classPrefix}-content`}>
        {props.loading ? (
          <div className={`${classPrefix}-loading-wrapper`}>
            <DotLoading />
          </div>
        ) : (
          <>
            {!!props.onPullDownRefresh && (
              <div className={`${classPrefix}-pulldown-wrapper`}>
                {beforePullDown ? (
                  <span>下拉并刷新</span>
                ) : isPullingDown ? (
                  <DotLoading />
                ) : (
                  <span>刷新成功</span>
                )}
              </div>
            )}

            {props.isEmpty ? (
              <div className={`${classPrefix}-empty-wrapper`}>
                <Empty description="暂无数据" />
              </div>
            ) : (
              <>
                <div className={`${classPrefix}-content-wrapper`}>{props.children}</div>
                {!!props.onPullUpLoad && (
                  <div className={`${classPrefix}-pullup-wrapper`}>
                    {props.hasMore ? (
                      <>
                        {!isPullUpLoad && <span>上拉加载更多</span>}
                        {isPullUpLoad && <DotLoading />}
                      </>
                    ) : (
                      <span>已经到底了</span>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>,
  );
});
