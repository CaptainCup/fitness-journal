'use client'

import React, {
  ReactNode,
  useState,
  useMemo,
  useImperativeHandle,
  forwardRef,
  Fragment,
  useCallback,
} from 'react'
import axios from 'axios'
import { KeyedMutator } from 'swr'
import InfiniteScroll from 'react-infinite-scroller'
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite'
import { BaseHttpService } from '@/app/services-client'

import styles from './InfiniteList.module.css'

const httpService = new BaseHttpService()

const addItem = (data: any[] | undefined, item: any): any[] => {
  if (!data) return [[item]]

  return [[item, ...data[0]], ...data.slice(1)]
}

const updateItem = (data: any[] = [], id: string, newItem: any): any[] => {
  return [...data]?.map(items =>
    [...items].map(item => (item._id === id ? { ...item, ...newItem } : item)),
  )
}

const removeItem = (data: any[] | undefined, id: string): any[] | undefined => {
  return data?.map(items => items.filter((item: any) => item._id !== id))
}

const getItem = (data: any[] = [], id: string): any => {
  if (!data) return null
  return data?.flat()?.find(item => item?._id === id)
}

const getKey = (
  pageIndex: number,
  previousPageData: any,
  endpoint: string,
  pageLimit: number,
  params?: { [key: string]: any },
) => {
  if (previousPageData && !previousPageData.length) {
    return null
  }

  let query = ''

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value && !key.includes('utm_')) {
        if (Array.isArray(value)) {
          value.forEach(param => {
            query += `&${key}[]=${param}`
          })
        } else {
          query += `&${key}=${value}`
        }
      }
    })
  }

  return `/${endpoint}?offset=${
    pageIndex * pageLimit
  }&limit=${pageLimit}${query}`
}

const fetcher = async (
  url: string,
  onLoad: (value: number) => void,
  onLoading: (value: boolean) => void,
) => {
  try {
    onLoading(true)
    const result = await httpService.get(url)
    onLoad(result.count)
    return result.items
  } catch (error: any) {
    if (error?.response?.status === 404) {
      onLoading(false)
      onLoad(0)
      throw new Error('Items not found!')
    }
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message)
    }
  } finally {
    onLoading(false)
  }
}

export type InfiniteListCallbacks = {
  addItem: (el: any) => Promise<any[] | undefined>
  updateItem: (id: string, newData: any) => Promise<any[] | undefined>
  removeItem: (id: string) => Promise<any[] | undefined>
  getItem: (id: string) => any
  mutate: KeyedMutator<any[]>
}

export type InfiniteListProps = {
  endpoint: string
  pageLimit?: number
  params?: { [key: string]: any }
  options?: SWRInfiniteConfiguration
  listClassName?: string
  useWindow?: boolean
  renderItem: (data: any, index: number) => ReactNode
}

const InfiniteList = forwardRef<InfiniteListCallbacks, InfiniteListProps>(
  (
    {
      endpoint,
      params,
      pageLimit = 10,
      options,
      listClassName = 'grid gap-2 md:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mb-5',
      useWindow = true,
      renderItem,
    },
    ref,
  ) => {
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)

    const {
      data = [],
      mutate,
      size,
      setSize,
    } = useSWRInfinite(
      (pageIndex, previousPageData) =>
        getKey(pageIndex, previousPageData, endpoint, pageLimit, params),
      url =>
        fetcher(
          url,
          countRes => setCount(countRes),
          state => setLoading(state),
        ),
      {
        shouldRetryOnError: false,
        ...options,
      },
    )

    const hasMore = useMemo(() => {
      const pages = Math.ceil(count / pageLimit)
      return pages > size
    }, [count, size, pageLimit])

    useImperativeHandle(ref, () => ({
      mutate,
      addItem: item => mutate(array => addItem(array, item), false),
      updateItem: (id, item) =>
        mutate(array => updateItem(array, id, item), false),
      removeItem: id => mutate(array => removeItem(array, id), false),
      getItem: (id): void => getItem(data, id),
    }))

    const handleDelete = useCallback(
      async (id: string) => {
        await httpService.delete(`${endpoint}/${id}`)
        mutate(array => removeItem(array, id), false)
      },
      [endpoint, mutate],
    )

    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={size}
        className={listClassName}
        hasMore={hasMore}
        useWindow={useWindow}
        loadMore={() => !loading && setSize(size + 1)}
        loader={
          <Fragment key="loading">
            {loading && (
              <div className="w-full h-full flex justify-center items-center col-span-2 sm:col-span-3 md:col-span-4">
                <div className={styles.loader} />
              </div>
            )}
          </Fragment>
        }
      >
        {data?.flat().length ? (
          data
            ?.flat()
            .map((item, index) =>
              renderItem(
                { ...item, onDelete: () => handleDelete(item._id) },
                index,
              ),
            )
        ) : (
          <p className="col-span-2 sm:col-span-3 md:col-span-4">
            Ничего не найдено
          </p>
        )}
      </InfiniteScroll>
    )
  },
)

InfiniteList.displayName = 'InfiniteList'

export default InfiniteList
