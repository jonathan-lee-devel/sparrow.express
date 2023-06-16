import {FC} from 'react'
import LoginModal from "@/components/LoginModal";

const page: FC = () => {
    return (
        <div>
            <div className={"flex flex-col items-center justify-center h-screen"}>
                <div>
                    <div className={'pt-5 mt-5 items-center flex justify-center'}>
                        <LoginModal isVisible={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
