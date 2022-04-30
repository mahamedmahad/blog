// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {GraphQLClient, gql} from "graphql-request";


const graphQlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCmsToken = process.env.GRAPHCMS_TOKEN


export default async function comments(req, res) {
   console.log({graphCmsToken})

    const {name, email, comment} = req.body

    const graphQLClient = new GraphQLClient(graphQlAPI, {
        headers: {
            authorization: `Bearer ${graphCmsToken}`
        }
    });


    const query = gql`
        #Update data or add data
        # a mutation that will create a comment. 
        mutation CreateComment($name:String!, $email:String!, $comment: String! $slug:String!) {
            createComment(
                
                data: {
                    name: $name,
                    email: $email,
                    comment:$comment,
                    post: { connect: { slug: $slug }}
                }) { id }
        }
    `
    /* Sending a request to the GraphQL API and returning the result. */
    try {
        const result = await graphQLClient.request(query, req.body);

        return res.status(200).send(result)
    /* Catching any errors that may occur and sending them back to the client. */
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }

}
