import{InMemoryCache, ApolloClient, NormalizedCacheObject} from "@apollo/client";

// const client = new ApolloClient({
//     uri: "https://loquesea.com/graphql",
//     cache: new InMemoryCache(),
// })


const CSRClient = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache(),
});

const getClient = () => {
    if(typeof window === "undefined"){
        return new ApolloClient({
            uri: "http://back:8080/graphql",
            cache: new InMemoryCache(),
        })
    }else{
        return CSRClient;
    }
}

export default getClient;