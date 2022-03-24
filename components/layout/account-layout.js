import { useRouter } from 'next/router';
import SideProfile from '../../components/Cards/Order/Profile-card'

function accountLayout(WrappedComponent) {
    return (props) => (
        <section className="bg-gray-100 w-full ">
            <div className="wrapper mx-auto">
                <div className="grid grid-cols-11 ">
                    <div className=" hidden md:block lg:block lg:col-span-2 md:col-span-4 col-span-0 my-0  md:my-10 lg:my-10  ">
                        <SideProfile userdetail={props.user} />
                    </div>
                    <div className="lg:col-span-9 md:col-span-7 col-span-11 my-10  md:mx-0 lg:mx-0 md:ml-8 lg:ml-8 ">
                        <WrappedComponent {...props} />
                    </div>
                </div>
            </div>
        </section>
    )
}


export default accountLayout;
