import {request, gql} from 'graphql-request';


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
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

    const result = await request(graphqlAPI, query);

    return result.postsConnection.edges;


};

export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails {
            # Ordering the posts by the createdAt field in ascending order 
            #and limiting the number of posts returned to 3. 
            posts (
                orderBy: createdAt_ASC
                last:3
            ) {
                title
                featuredImage{
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query);

    return result.posts;
}


export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($slug:String!, $categories: [String!]) {
            # querying the posts table for all posts that are not the current post and have a category that matches the
            # current posts category
            #Limiting the number of posts returned to 3.
            posts(
                where:{slug_not:$slug, AND:{categories_some: {slug_in:$categories}}}
                last:3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query, {categories, slug});
    return result.posts
}

/**
 * returns An array of objects with the name and slug of each category.
 */
export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `;

    const result = await request(graphqlAPI, query);

    return result.categories;
};


export const getPostDetails = async (slug) => {
    const query = gql`
        query GetPostDetails($slug: String){
            post(where: {slug: $slug})
            {
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
                content {
                    raw
                }
            }
        }


    `;

    const result = await request(graphqlAPI, query, {slug});

    return result.post;


};

/**
 *  takes an object as an argument, and then sends that object to the server
 * @returns The result of the fetch request.
 */
export const submitComment = async (obj) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    return result.json();
}


/**
 * It gets the comments for each post
 * return An array of comments.
 */
export const getComments = async (slug) => {
    const query = gql`
        query GetComments($slug: String!) {
            comments(where: { post : { slug: $slug }}) {
                name 
                createdAt
                comment
            }
        }
    `;

    const result = await request(graphqlAPI, query, { slug });

    return result.comments;
};



export const getFeaturedPosts = async () => {
    const query = gql`
        query GetCategoryPost {
            posts(where: {featuredPost: true}) {
                author {
                    name
                    photo {
                        url
                    }
                }
                featuredImage {
                    url
                }
                title
                slug
                createdAt
            }
        }
    `;

    const result = await request(graphqlAPI, query);

    return result.posts;
};


export const getCategoryPost = async (slug) => {
    const query = gql`
        query GetCategoryPost($slug: String!) {
            postsConnection(where: {categories_some: {slug: $slug}}) {
                edges {
                    cursor
                    node {
                        author {
                            bio
                            name
                            id
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

    const result = await request(graphqlAPI, query, { slug });

    return result.postsConnection.edges;
};
