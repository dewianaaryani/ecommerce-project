import { getImageUrl } from "@/lib/supabase";
import prisma from "../../../../../lib/prisma";

export async function getMostBoughtProduct() {
    try {
      // Step 1: Aggregate total quantities for each product
      const aggregatedProducts = await prisma.orderProduct.groupBy({
        by: ['product_id'],
        _sum: {
          quantity: true,
        },
        orderBy: {
          _sum: {
            quantity: 'desc',
          },
        },
        take: 1, // Limit to the most bought product
      });
  
      // Step 2: Fetch the details of the most bought product
      if (aggregatedProducts.length === 0) {
        return null; // No products found
      }
  
      const mostBoughtProductId = aggregatedProducts[0].product_id;
  
      const product = await prisma.product.findUnique({
        where: { id: mostBoughtProductId },
        select: {
          images: true,
          id: true,
          name: true,
          description: true,
          category: {
            select: {
              name: true,
            },
          },
          price: true,
        },
      });
  
      // Check if the product is null
      if (!product) {
        return null; // Product not found
      }
  
      // Add image URL to the product details
      const response = {
        ...product,
        image_url: getImageUrl(product.images[0], 'products'),
      };
  
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        products: true
                    }
                }
            }
        })

        return categories
    } catch (error) {
        console.log(error);
        return []
    }
}

export async function getProducts(){
    try {
        const products = await prisma.product.findMany({
            select: {
                images: true,
                id:true,
                name: true,
                category: {
                    select: {
                        name:true
                    }
                },
                price: true,
            }
        })
        const response = products.map((item) => {
            return {
                ...item,
                image_url: getImageUrl(item.images[0], 'products')
            }
        })
        return response
    } catch (error) {
        console.log(error);
        return []
    }
}

export async function getBrands(){
    try {
        const brands = await prisma.brand.findMany({
            select: {
                logo: true,
                id: true,
            }
        })
        const response = brands.map((item) => {
            return {
                ...item,
                logo_url: getImageUrl(item.logo, 'brands')
            }
        })
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}