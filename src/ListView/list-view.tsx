import React, { CSSProperties, FC, useState, useEffect } from 'react';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import { NativeProps, withNativeProps } from 'antd-mobile/es/utils/native-props';
import classNames from 'classnames';
import ScrollView, { ScrollViewProps } from '../ScrollView';
import { useMount, useMemoizedFn } from 'ahooks';

const classPrefix = `ljmui2-list-view`;

export type ListViewProps = {
  initialLoad?: boolean;
  pageStart?: number;
  renderItem: (value: any, index: number, array: any[]) => void;
  loadMore: (page: number) => Array<any>;
} & ScrollViewProps;

const defaultProps = {
  initialLoad: true,
  pageStart: 1,
};

export const ListView: FC<ListViewProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const [loading, setLoading] = useState(false);
  const [{ list, page, hasMore }, setPageData] = useState<{
    list: Array<any>;
    page: number;
    hasMore: boolean;
  }>({
    list: [],
    page: 1,
    hasMore: true,
  });

  const onPullDownRefresh = useMemoizedFn(async () => {
    let curPage = props.pageStart;
    const curList = await props.loadMore(curPage);
    setPageData({
      list: curList,
      page: curPage,
      hasMore: curList.length > 0,
    });
  });

  const onPullUpLoad = useMemoizedFn(async () => {
    let curPage = page + 1;
    const curList = await props.loadMore(curPage);
    setPageData({
      list: [...list, ...curList],
      page: curPage,
      hasMore: curList.length > 0,
    });
  });

  useMount(async () => {
    if (props.initialLoad) {
      setLoading(true);
      await onPullDownRefresh();
      setLoading(false);
    }
  });

  return withNativeProps(
    props,
    <ScrollView
      className={classNames(classPrefix)}
      onPullDownRefresh={onPullDownRefresh}
      onPullUpLoad={onPullUpLoad}
      loading={loading}
      hasMore={hasMore}
      isEmpty={list.length === 0}
    >
      {list.map(props.renderItem)}
    </ScrollView>,
  );
};
