import NextLink from "next/link";
import { connect } from "react-redux";

// export default NextLink;

const Link = ({ store, href = '', children }) => {
    // if (store) {
    //     const url = `/${store.store_name.replaceAll(" ", '-').trim()}/${store.store_id}`
    //     return (
    //         <NextLink href={`${url}${href}`}>{children}</NextLink>
    //     )
    // }
    return (
        <NextLink href={`${href}`}>{children}</NextLink>
    )
}
// const mapStateToProps = state => ({
//     store: state.store.shop
// })
export default Link;
