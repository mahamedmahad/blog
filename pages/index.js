import Head from "next/head";

//posts
import {getPosts} from "../services";

//components
import {PostCard, Categories, PostWidget} from "../components";
import {gql, request} from "graphql-request";

/*const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const query = gql`
    query {
        postsConnection {
            edges {
                node {
                    author {
                        bio
                        name
                        photo {
                            url
                        }
                    }
                    createdAt
                    slug
                    title
                    excerpt
                    featuredImage {
                        url
                    }
                    categories {
                        name
                        slug
                    }
                }
            }
        }
    }
`;

//const result = await request(graphqlAPI, query);
request(graphqlAPI, query).then((data) => console.log(data))

 */


export default function Home({posts}) {
    return (
        <div className="container mx-auto px-10 mb-8">
            <Head>
                <title>NextJs Blog</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                    {posts.map((post) => <PostCard post={post} key={post.title}/>
                    )}

                </div>

                <div className="lg:col-span-4 col-span-1">
                    <div className="lg:sticky relative top-8">
                        <PostWidget/>
                        <Categories/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export async function getStaticProps () {
    const posts = (await getPosts()) || []

    return {
        props: {posts}
    }
}