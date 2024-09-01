"use client"
import React from 'react'
import CardPoduct from '../../_components/card-product'
import { useQuery } from '@tanstack/react-query'
import { fetchProduct } from '../lib/data'
import { useFilter } from '@/hooks/useFilter'

export default function ProductListing() {
const {filter} = useFilter()
  const { data, isLoading } = useQuery({
    queryKey: ['product-listing', filter],
    queryFn: () => fetchProduct(filter),
  })
  if (isLoading) {
    <div className="grid grid-cols-1 gap-[30px]">
        <span>Loading...</span>
      </div>
  }
    return (
      <div className="grid grid-cols-3 gap-[30px]">
       {data?.map((product) => (
         <CardPoduct key={product.id + product.name} item={product} /> 
       ))}
      </div>
    )
}
