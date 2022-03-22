import SideProfile from '../../components/Cards/Order/Profile-card'

function accountLayout(WrappedComponent) {
    return (props) => (
        <section className="bg-gray-100 w-full ">
            <div className="wrapper mx-auto">
                <div className="grid grid-cols-11 ">
                    <div className="lg:col-span-2 md:col-span-4  my-10 ">
                        <SideProfile />
                    </div>
                    <div className="lg:col-span-9 md:col-span-7 my-10 ml-8 ">
                        <WrappedComponent {...props} />
                    </div>
                </div>
            </div>
        </section>
    )
}


export default accountLayout;
