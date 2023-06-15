'use client'

import {Organization, Prisma} from '@prisma/client'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import debounce from 'lodash.debounce'
import {usePathname, useRouter} from 'next/navigation'
import {FC, useCallback, useEffect, useRef, useState} from 'react'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/Command'
import {useOnClickOutside} from '@/hooks/use-on-click-outside'
import {Users} from 'lucide-react'

interface SearchBarProps {
}

const SearchBar: FC<SearchBarProps> = ({}) => {
    const [input, setInput] = useState<string>('')
    const pathname = usePathname()
    const commandRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useOnClickOutside(commandRef, () => {
        setInput('')
    })

    const request = debounce(async () => {
        refetch()
    }, 300)

    const debounceRequest = useCallback(() => {
        request()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const {
        isFetching,
        data: queryResults,
        refetch,
        isFetched,
    } = useQuery({
        queryFn: async () => {
            if (!input) return []
            const {data} = await axios.get(`/api/search?q=${input}`)
            return data as (Organization & {
                _count: Prisma.OrganizationCountOutputType
            })[]
        },
        queryKey: ['search-query'],
        enabled: false,
    })

    useEffect(() => {
        setInput('')
    }, [pathname])

    return (
        <Command
            ref={commandRef}
            className={'rounded-lg border bg-slate-300 max-w-100 z-50 overflow-visible'}>
            <CommandInput
                isLoading={isFetching}
                onValueChange={(text) => {
                    setInput(text)
                    debounceRequest()
                }}
                value={input}
                className={'outline-none border-none bg-slate-300 focus:border-none focus:outline-none ring-0'}
                placeholder='Search services...'
            />

            {input.length > 0 && (
                <CommandList className='absolute bg-slate-500 top-full inset-x-0 shadow rounded-b-md'>
                    {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
                    {(queryResults?.length ?? 0) > 0 ? (
                        <CommandGroup heading='Communities'>
                            {queryResults?.map((organization) => (
                                <CommandItem
                                    onSelect={(e) => {
                                        router.push(`/org/${e}`)
                                        router.refresh()
                                    }}
                                    key={organization.id}
                                    value={organization.name}>
                                    <Users className='mr-2 h-4 w-4'/>
                                    <a href={`/org/${organization.name}`}>org/{organization.name}</a>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    ) : null}
                </CommandList>
            )}
        </Command>
    )
}

export default SearchBar
