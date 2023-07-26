"use client"
import PromptCard from "./PromptCard"
import Link from "next/link"

const Profile = ({ name, desc, data, handleDel, handleEdit }) => {

    return (
        <section className="w-full">
            <h1 className="head_text text-left"><span className="blue_gradient">{name}</span> Profile</h1>
            <p className="desc text-left">{desc}</p>

            {!data.length ?
                <div className="flex flex-col my-10">
                    <p className="text-center text-xl text-bold">There are no prompts!</p>
                    <div className="flex items-center justify-center my-10">
                        <p className="text-xl text-bold mr-3">
                            Let's
                        </p>
                        <Link
                            href={'/create-prompt'}
                            className="black_btn w-25"
                        >
                            Create Prompt
                        </Link>
                    </div>
                </div> :
                <div className="mt-10 prompt_layout">
                    {data.map((post) => (
                        <PromptCard
                            key={post._id}
                            post={post}
                            handleEdit={() => handleEdit && handleEdit(post)}
                            handleDel={() => handleDel && handleDel(post)}
                        />
                    ))}
                </div>
            }
        </section>
    )
}

export default Profile