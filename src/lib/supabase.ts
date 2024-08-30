import { createClient } from "@supabase/supabase-js"


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ""

const supabase = createClient(supabaseUrl, supabaseKey)

export const getImageUrl = (name: string, path: 'brands' | 'products' = 'brands') => {
    const { data } = supabase
        .storage
        .from('ecommerce-project')
        .getPublicUrl(`public/${path}/${name}`)
    return data.publicUrl
}

export const uploadFile = async (file: File, path: 'brands' | 'products' = 'brands') => {

    const fileType = file.type.split('/')[1]
    const filename = `${path}-${Date.now()}.${fileType}`

    await supabase
        .storage
        .from('ecommerce-project')
        .upload(`public/${path}/${filename}`, file, {
            cacheControl: '3600',
            upsert: false
        })

    return filename

}

export const deleteFile = async (
    filename: string, path: 'brands' | 'products' = 'brands'
) => {
     await supabase
  .storage
  .from('ecommerce-project')
  .remove([`public/${path}/${filename}`])

}