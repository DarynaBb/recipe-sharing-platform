import React, { useContext, useEffect } from "react"; 
import { UserContext } from "../context/UserContext";

function UserProfile() {
    const {users, fetchUserData} = useContext(UserContext);

    useEffect(() => {
        fetchUserData();
      }, []);

  return (
    <section className="mt-[50px] mb-[20px] md:mb-[80px] max-container-nav p-[20px] md:padding-container flex flex-col items-center">
        <div>
            <div className='text-center mb-[20px] md:mb-[50px]'>
                <h1 className="text-[32px]">My profile</h1>
            </div>
            <div className="flex gap-[20px] md:gap-[50px] items-center flex-col md:flex-row">
                <div className="">
                    <img src={users[0]?.image} alt="profile photo" />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-[26px] md:text-[38px] mb-[20px] md:mb-[50px]">{users[0]?.firstName} {users[0]?.lastName}</h2>
                    <div className="flex flex-wrap gap-[20px] md:gap-[50px] text-[14px]">
                        <div className="basis-[45%] border-b-[1px] border-black pb-[16px]">
                            <h3 className="uppercase ">E-mail</h3>
                            <p className="text-gray64">{users[0]?.email}</p>
                        </div>
                        <div className="basis-[45%] border-b-[1px] border-black">
                            <h3 className="uppercase">recipes total</h3>
                            <p className="text-gray64">{users[0]?.recipes.length} Recipes</p>
                        </div>
                        <div className="basis-[45%] border-b-[1px] border-black pb-[16px]">
                            <h3 className="uppercase">joined date</h3>
                            <p className="text-gray64">13 April 2022</p>
                        </div>
                        <div className="basis-[45%] border-b-[1px] border-black">
                            <h3 className="uppercase">comments total</h3>
                            <p className="text-gray64">3 Comments</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default UserProfile