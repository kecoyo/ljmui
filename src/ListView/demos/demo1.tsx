import React, { useRef, useState, useCallback } from 'react';
import { Button, Space } from 'antd-mobile';
import { DemoBlock } from '../../demos';
import { ListView } from 'ljmui2';
import { useMount, useMemoizedFn } from 'ahooks';

const ajaxGet = (page: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let pageSize = 20;
      if (page < 4) {
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
  const loadMore = useMemoizedFn(async (page: number) => {
    const curList = await ajaxGet(page);
    console.log('🚀 ~ loadMore ~ curList', page, curList);
    return curList;
  });

  const renderItem = (item: any, index: any) => {
    return (
      <div key={index} style={{ height: 30 }}>
        {item.name}
      </div>
    );
  };

  return (
    <>
      <DemoBlock title="">
        <ListView pageStart={0} initialLoad={false} renderItem={renderItem} loadMore={loadMore} />
      </DemoBlock>
    </>
  );
};
