import React, { ReactNode, forwardRef, useRef, useState, useImperativeHandle, useEffect } from 'react';
import classNames from 'classnames';
import { SpinLoading, DotLoading, ErrorBlock, Skeleton } from 'antd-mobile';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import { NativeProps, withNativeProps } from 'antd-mobile/es/utils/native-props';
import { useMount, useMemoizedFn, useUnmount } from 'ahooks';
import BScroll, { Options } from 'better-scroll';

const classPrefix = `ljm-scroll-view`;

export type ScrollViewRef = {
  bscroll?: BScroll;
  refresh: () => void;
  scrollTo(x: number, y: number, time?: number): void;
  scrollBy(deltaX: number, deltaY: number, time?: number): void;
  stop(): void;
};

export type ScrollViewProps = {
  direction?: 'vertical' | 'horizontal';
  onScroll?: (e: { x: number; y: number }) => void;
  onPullDownRefresh?: () => void;
  onPullUpLoad?: () => void;
  hasMore?: boolean;
  children: ReactNode;
} & Options &
  NativeProps;

const defaultProps = {
  direction: 'vertical',
  pullDownRefresh: {
    threshold: 60,
    stop: 40,
  },
  pullUpLoad: {
    threshold: 0,
  },
};

const TIME_BOUNCE = 800;

export const ScrollView = forwardRef<ScrollViewRef, ScrollViewProps>((p, ref) => {
  const props: ScrollViewProps = mergeProps(defaultProps, p);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [bscroll, setBScroll] = useState<BScroll>();
  const [beforePullDown, setBeforePullDown] = useState(true);
  const [isPullingDown, setIsPullingDown] = useState(false);
  const [isPullUpLoad, setIsPullUpLoad] = useState(false);
  const [showPullupWrapper, setShowPullupWrapper] = useState(false);

  // 检测是否可以下拉
  const checkPullDown = useMemoizedFn(() => {
    return props.onPullDownRefresh;
  });

  // 检测是否可以上拉
  const checkPullUp = useMemoizedFn(() => {
    return props.onPullUpLoad && props.hasMore;
  });

  useMount(() => {
    if (wrapperRef && wrapperRef.current) {
      const {
        className,
        style,
        tabIndex,
        direction,
        hasMore,
        children,
        onScroll,
        pullDownRefresh,
        onPullDownRefresh,
        pullUpLoad,
        onPullUpLoad,
        ...scrollOptions
      } = props;

      const bscroll: BScroll = new BScroll(wrapperRef.current, {
        scrollX: props.direction === 'horizontal',
        scrollY: props.direction === 'vertical',
        probeType: 3, // listening scroll event
        scrollbar: true,
        mouseWheel: true,
        click: true,
        observeDOM: true,
        observeImage: true,
        pullDownRefresh: props.onPullDownRefresh ? pullDownRefresh : undefined,
        pullUpLoad: props.onPullUpLoad ? pullUpLoad : undefined,
        ...scrollOptions,
      });

      const pullingDownHandler = async () => {
        if (!checkPullDown()) {
          bscroll.finishPullDown();
          return;
        }

        setBeforePullDown(false);
        setIsPullingDown(true);

        if (props.onPullDownRefresh) {
          await props.onPullDownRefresh();
        }

        setIsPullingDown(false);
        bscroll.finishPullDown();

        setTimeout(() => {
          setBeforePullDown(true);
          bscroll.refresh();
        }, TIME_BOUNCE + 100);
      };

      const pullingUpHandler = async () => {
        if (!checkPullUp()) {
          bscroll.finishPullUp();
          return;
        }

        setIsPullUpLoad(true);

        if (props.onPullUpLoad) {
          await props.onPullUpLoad();
        }

        bscroll.finishPullUp();
        bscroll.refresh();
        setIsPullUpLoad(false);
      };

      !!props.onPullDownRefresh && bscroll.on('pullingDown', pullingDownHandler);
      !!props.onPullUpLoad && bscroll.on('pullingUp', pullingUpHandler);
      !!props.onScroll && bscroll.on('scroll', props.onScroll);

      setBScroll(bscroll);
    }
  });

  useUnmount(() => {
    if (bscroll) {
      bscroll.destroy();
    }
  });

  useImperativeHandle(ref, () => ({
    bscroll: bscroll,
    refresh: () => {
      bscroll?.refresh();
    },
    scrollTo: (x: number, y: number, time?: number) => {
      bscroll?.scrollTo(x, y, time);
    },
    scrollBy: (deltaX: number, deltaY: number, time?: number) => {
      bscroll?.scrollBy(deltaX, deltaY, time);
    },
    stop: () => {
      bscroll?.stop();
    },
  }));

  useEffect(() => {
    // 设置pullUpLoad时，滚动区小于容器区时，不显示PullupWrapper
    if (bscroll && props.onPullUpLoad) {
      if (bscroll.scrollerHeight > bscroll.scroller.wrapper.offsetHeight) {
        setShowPullupWrapper(true);
      }
    }
  });

  return withNativeProps(
    props,
    <div ref={wrapperRef} className={classNames(classPrefix, `${classPrefix}-${props.direction}`, {})}>
      <div className={`${classPrefix}-content`}>
        {!!props.onPullDownRefresh && (
          <div className={`${classPrefix}-pulldown-wrapper`}>
            {beforePullDown ? <span>下拉并刷新</span> : isPullingDown ? <DotLoading color='primary' /> : <span>刷新成功</span>}
          </div>
        )}

        <div className={`${classPrefix}-content-wrapper`}>{props.children}</div>

        {!!props.onPullUpLoad && showPullupWrapper && (
          <div className={`${classPrefix}-pullup-wrapper`}>
            {props.hasMore ? isPullUpLoad ? <DotLoading color='primary' /> : <span>上拉加载更多</span> : <span>已经到底了</span>}
          </div>
        )}
      </div>
    </div>
  );
});
