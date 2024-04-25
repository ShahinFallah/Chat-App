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
            className={`fixed top-4 left-4 w-64 bg-gradient-to-tr from-background_200 to-background_300 shadow-lg rounded-md border-l-4 border-primary p-3 overflow-hidden transform transition-transform z-50 cursor-pointer ${show ? 'visibleNotif' : '-translate-x-[280px]'}`}
            onClick={() => setSelectedConversation(data.notification)}
        >
            <div className="flex items-start">
                {
                    true ?
                        <div className={`avatar placeholder`}>
                            <div className="bg-gradient-to-br from-primary_200  text-text_color to-primary rounded-full w-[2.7rem] relative">
                                <span className="text-[1.2rem] absolute top-1.5 ">{showNameInProfile(data.notification.fullName )}</span>
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
                    <p className="text-lg font-semibold text-gray-800 w-28 truncate">{data.notification.fullName}</p>
                    <p className="text-sm text-gray-600 truncate w-24">{data.message}</p>
                </div>
                <div className="ml-auto pl-3 absolute top-2 right-2">
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition"
                        onClick={handleHidden}
                    >
                        <IoClose size='23' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Notification;
