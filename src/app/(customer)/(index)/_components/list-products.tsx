import React, { ReactNode } from 'react'
import { getProducts } from '../lib/data'
import Link from 'next/link';
import { rupiahFormat } from '@/lib/utils';
import CardPoduct from './card-product';

interface ListProductsProps {
    title: ReactNode
}

export default async function ListProducts({ title }: ListProductsProps) {
    const products = await getProducts()

    return (
        <div id="picked" className="flex flex-col gap-[30px]">
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-2xl leading-[34px]">
                    {title}
                </h2>
                <a href="catalog.html" className="p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold">Explore All</a>
            </div>
            <div className="grid grid-cols-5 gap-[30px]">
                {products.map((item) => (
                   <CardPoduct key={`${item.name + item.id}`} item={{
                    category_name: item.category.name,
                    id: item.id,
                    image_url: item.image_url,
                    name: item.name,
                    price: Number(item.price)
                   }} />
                ))}

            </div>
        </div>
    )
}
