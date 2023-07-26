'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"

import Profile from '../../components/Profile'

const MyProfile = () => {

    const { data: session } = useSession()
    const router = useRouter()

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()
            setPosts(data)
            setLoading(false)
        }

        if (session?.user.id) fetchPosts()
    }, [])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDel = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE',
                })

                const filteredPost = posts.filter((item) => item._id !== post._id)

                setPosts(filteredPost)

            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <div>
            {loading ? (
                <div className="flex gap-3 md:gap-5">
                    <Image
                        src={'assets/icons/loader.svg'}
                        width={150}
                        height={150}
                        className="rounded-full mt-32"
                        alt="loader" />
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <Profile
                        name='My'
                        desc='Welcome to your personalized profile page'
                        data={posts}
                        handleEdit={handleEdit}
                        handleDel={handleDel}
                    />
                </motion.div>
            )}
        </div>


    )
}

export default MyProfile