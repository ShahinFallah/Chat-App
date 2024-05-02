import { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { useNotificationContext } from '../../context/NotificationContext';
import useChatConversationHandler from '../../zustand/useChatConversationHandler';
import showNameInProfile from '../../utils/showNameInProfile';

function Notification({ data }) {
    const [show, setShow] = useState(true);
    const { setNotification } = useNotificationContext()
    const { setSelectedConversation } = useChatConversationHandler()

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);

            setTimeout(() => {
                setNotification(null)
            }, 1000)

        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    const handleHidden = e => {
        e.stopPropagation()
        setShow(false)
    }

    return (
        <div
            className={`fixed top-4 left-4 w-64 bg-gradient-to-tr from-background_200 to-background_300 shadow-lg rounded-md border-l-4 border-primary p-3 small-height:p-1 small-height:py-2 overflow-hidden transform transition-transform z-50 cursor-pointer small-height:w-56 ${show ? 'visibleNotif' : '-translate-x-[280px]'}`}
            onClick={() => setSelectedConversation(data.notification)}
        >
            <div className="flex items-start">
                {
                    true ?
                        <div className={`avatar placeholder`}>
                            <div className="bg-gradient-to-br from-primary_200  text-text_color to-primary rounded-full w-[2.7rem] relative small-height:w-[2.35rem]">
                                <span className="text-[1.1rem] absolute top-[0.500rem] small-height:top-[0.40rem] small-height:text-[1.050rem]">{showNameInProfile(data.notification.fullName )}D</span>
                            </div>
                        </div>
                        :
                        <div className="flex-shrink-0 bg-accent_color rounded-full p-0.5">
                            <img
                                className="h-10 w-10 rounded-full"
                                src="https://avatar.iran.liara.run/public/boy?username=Ashkan"
                                alt=""
                            />
                        </div>
                }

                <div className="ml-3">
                    <p className="text-lg text-primary_300 font-semibold w-28 truncate small-height:text-[1rem] small-height:-mt-1">{data.notification.fullName}</p>
                    <p className="text-sm -mt-0.5 truncate w-24 small-height:text-sm small-height:-mt-[0.5]">{data.message}</p>
                </div>
                <div className="ml-auto pl-3 absolute top-2 right-2">
                    <button
                        type="button"
                        className="focus:outline-none transition"
                        onClick={handleHidden}
                    >
                        <IoClose className=' size-6 small-height:size-5'/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Notification;
