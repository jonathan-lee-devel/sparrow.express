import SearchBar from "@/components/SearchBar";

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home() {
    return (
        <>
            <div>
                <div className={"container pt-32 max-w-7xl mx-auto"}>
                    <div className={"items-center"}>
                        <h1
                            className={"text-amber-400 italic text-4xl md:text-5xl lg:text-6xl text-center font-extrabold leading-tight tracking-tighter"}>
                            Sparrow.Express
                        </h1>
                    </div>
                    <div>
                        <p className={"text-amber-500 text-2xl md:text-3xl lg:text-4xl text-center"}>
                            Search for your favorite delivery service:
                        </p>
                    </div>
                    <div className={"items-center"}>
                        <SearchBar></SearchBar>
                    </div>
                </div>
            </div>
        </>
    )
}
