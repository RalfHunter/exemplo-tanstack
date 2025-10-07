interface PostsProps {
    params: {id: string}
}

export default function PostByIdPage({params}:PostsProps){
    const {id} = params

    return(
        <>
            Listando o post {id}
        </>
    )
}