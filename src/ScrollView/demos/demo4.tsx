import React, { useRef, useState, useCallback } from 'react';
import { Button, Space } from 'antd-mobile';
import { DemoBlock } from '../../demos';
import { ScrollView } from 'ljmui2';
import { useMount, useMemoizedFn } from 'ahooks';

const ajaxGet = (page: number) => {
  return new Promise<Array<any>>((resolve) => {
    setTimeout(() => {
      let pageSize = 20;
      if (page < 0) {
        let start = (page - 1) * pageSize;
        let news = [];
        for (let i = 0; i < pageSize; i++) {
          news.push({ id: start + i, name: 'name-' + (start + i) });
        }
        resolve(news);
      } else {
        resolve([]);
      }
    }, 2000);
  });
};

// list, page, hasMore, onLoad, startY, onScroll
export default () => {
  const [loading, setLoading] = useState(false);
  const [{ list, page, hasMore }, setPageData] = useState({
    list: new Array(),
    page: 1,
    hasMore: true,
  });
  const ref = useRef(null);

  const onPullDownRefresh = useMemoizedFn(async () => {
    let curPage = 1;
    const curList = await ajaxGet(curPage);
    console.log('🚀 ~ onPullDownRefresh ~ curList', curList);
    setPageData({
      list: curList,
      page: curPage,
      hasMore: curList.length > 0,
    });
  });

  const onPullUpLoad = useMemoizedFn(async () => {
    let curPage = page + 1;
    const curList = await ajaxGet(curPage);
    console.log('🚀 ~ onPullUpLoad ~ curList', curList);
    setPageData({
      list: [...list, ...curList],
      page: curPage,
      hasMore: curList.length > 0,
    });
  });

  const onScroll = useMemoizedFn(async (e) => {
    console.log('🚀 ~ onScroll ~ e', e);
    console.log('🚀 ~ onScroll ~ ref', ref);
  });

  useMount(async () => {
    setLoading(true);
    await onPullDownRefresh();
    setLoading(false);

    // setTimeout(() => {
    //   let bscroll = ref.current.bscroll;
    //   bscroll.scrollTo(0, -100);
    // }, 0);
  });

  return (
    <>
      <DemoBlock title="">
        <ScrollView
          ref={ref}
          onPullDownRefresh={onPullDownRefresh}
          onPullUpLoad={onPullUpLoad}
          loading={loading}
          hasMore={hasMore}
          isEmpty={list.length === 0}
          onScroll={onScroll}
        >
          {list.map((item, index) => (
            <div key={index} style={{ height: 30 }}>
              {item.name}
            </div>
          ))}
        </ScrollView>
      </DemoBlock>
    </>
  );
};
