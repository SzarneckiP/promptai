'use client'
import { useState, useEffect } from "react"
import { PromptCard } from '../components'
import Image from "next/image"
import { motion } from "framer-motion"

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <>
            {!data.length ? (
                <div>
                    <h2 className=" text-7xl orange_gradient">No prompts yet!</h2>
                </div>
            ) : (
                <div className="my-16 flex flex-wrap gap-6 mb-96"
                >
                    {data.map((post) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
                        </motion.div>
                    ))}
                </div>
            )}
        </>
    )
}

const Feed = () => {

    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const filterPrompts = (searchText) => {
        const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
        return posts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout)
        setSearchText(e.target.value)

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    }

    const handleTagClick = (tagName) => {
        setSearchText(tagName);

        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    };

    useEffect(() => {
        setLoading(true)
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json()
            setPosts(data)
            setLoading(false)
        }

        fetchPosts()
    }, [])
    if (loading) return (<div className="flex gap-3 md:gap-5">
        <Image
            src={'assets/icons/loader.svg'}
            width={150}
            height={150}
            className="rounded-full mt-32"
            alt="loader" />
    </div>)

    return (
        <motion.section
            className="feed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
        >
            <form className="search_input relative w-full flex-center justify-between">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="w-full border-none focus:outline-none py-2.5 peer"
                />
                <motion.button
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className={searchText ? `text-right text-gray-300 py-2.5 px-5` : `hidden`}
                    onClick={(e) => {
                        e.preventDefault(),
                            setSearchText("")
                    }}
                >
                    X
                </motion.button>
            </form>

            {searchText ? (
                <PromptCardList
                    data={searchedResults}
                    handleTagClick={handleTagClick}
                />
            ) : (
                <PromptCardList
                    data={posts}
                    handleTagClick={handleTagClick}
                />
            )}
        </motion.section>
    )
}

export default Feed