import { BiLogOut } from 'react-icons/bi'
import useLogout from '../../hooks/useLogout'

function LogoutButton() {
    const { logout, loading } = useLogout()
    return (
        <div className="mt-auto">
            {!loading ? (
                <BiLogOut onClick={logout} className='w-6 h-6 text-white cursor-pointer' />
            ) : (
                <BiLogOut className='loading loading-spinner' />
            )}
        </div>
    )
}

export default LogoutButton








// STARTER CODE

// import { BiLogOut } from 'react-icons/bi'

// function LogoutButton() {
//     return (
//         <div className="mt-auto">
//             <BiLogOut className='w-6 h-6 text-white cursor-pointer'/>
//         </div>
//     )
// }

// export default LogoutButton