'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useCallback } from 'react'
import { IconType } from 'react-icons'

interface CategoryBoxProps {
  icon: IconType
  label: string
  selected?: boolean
  description?: string
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  description,
}) => {
  const router = useRouter()
  const params = useSearchParams()
  const handleClick = useCallback(() => {
    let currentQuery = {}
    if (params) qs.parse(params.toString())

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    }

    if (params?.get('category') === label) delete updatedQuery.category

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    )

    router.push(url)
  }, [label, params, router])
  return (
    <div
      onClick={handleClick}
      className={`
        p-3
        flex
        gap-2
        flex-col
        border-b-2
        transition
        items-center
        cursor-pointer
        justify-center
        hover:text-neutral-800
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
      `}
    >
      <Icon size={26} />
      <div className='font-medium text-sm'>{label}</div>
    </div>
  )
}

export default CategoryBox
