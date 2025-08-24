import { EllipsisVertical, Trash2, UserRound } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const ShowAllReplys = ({ reply }) => {
    const [blink, setBlink] = useState(false);

    const user = useSelector(((state) => state.userSlice.current_User))
    console.log(user)
    const handelBlink = () => {
        setBlink((prev) => !prev)
    }
    const deleteComment = async () => {

    }
    return (
        <div className='my-4 border-b-2 w-[95%] mx-auto'>
            <div className="flex gap-10  items-center relative  w-[95%] mx-auto">
                <div className="user Profile h-12 w-12">
                    {
                        reply?.CommentOwner?.profilePicture.length > 0 ? (

                            <img
                                src={reply?.CommentOwner?.profilePicture.length} //comment?.CommentOwner?.profilePicture
                                className="size-full rounded-full object-cover border "
                                alt="user"
                            />
                        ):(<>
                        <div className='border h-12 w-12 rounded-full overflow-hidden flex justify-center items-end'>
                            <UserRound className='size-[80%] text-slate-800'/> 
                        </div>
                        </>)
                    }
                </div>
                <div className="user ">
                    {" "}
                    <h1
                        className="text-slate-600 text-[14px] md:text-lg cursor-pointer  "
                    // onClick={handleNavigate}
                    // onMouseEnter={handleUndeline}
                    // onMouseLeave={handelDefaultUnderLine}
                    >
                        @piyushl2808eas {/* comment?.CommentOwner?.username */}
                    </h1>
                    <div
                        className=" h-[2px] w-[0%] transition-all duration-300"
                    // ref={userref}
                    ></div>
                    <p className="fullName text-slate-600">
                        piyush makwana {/* {comment?.CommentOwner?.fullName} */}
                    </p>
                </div>
                <div className="cretead at text-slate-400 text-[12px] md:text-[16px]">
                    {" "}
                    {/* {getRelativeTime(comment.createdAt)} */}10minute ago
                </div>
                <div
                    className="h-9 w-9 rounded-full absolute right-5 flex justify-center items-center cursor-pointer transition-all duration-400  hover:bg-[#0c1816]"
                    onClick={handelBlink}
                >
                    {" "}
                    <EllipsisVertical className="size-[80%] text-cyan-400  " />
                </div>

                {blink &&
                    (user?._id?.toString() === reply?.ReplyOwner?._id?.toString() ? (

                        <div
                            className="border absolute right-0 top-11 bg-black rounded-md p-3 flex gap-2 items-center justify-center cursor-pointer hover:bg-[#060d0e] transition-all duration-300"
                            onClick={deleteComment}
                        >
                            <Trash2 /> delete
                        </div>
                    ) : (
                        <div className="border absolute right-0 top-11 bg-black rounded-md p-3 flex gap-2 items-center justify-center transition-all duration-300">
                            Not your comment
                        </div>
                    ))}
            </div>
            <div className="info flex flex-col gap-2">
                <p className='w-[95%] mx-auto'>{reply?.content}</p>
                <div className="flex items-center justify-between">


                </div>
            </div>
        </div>
    )
}

export default ShowAllReplys