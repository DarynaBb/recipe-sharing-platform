import React from 'react'

function Button({title, onClickFunction, bg, userId, recipeId}) {
  return (
    <button className={`bg-${bg} border-[1px] border-black px-[10px] py-[5px] md:px-[40px] md:py-[10px] uppercase text-[14px] font-poppins-semi-bold tracking-[1px] hover:bg-black hover:text-white`} onClick={() => onClickFunction(userId, recipeId)}>{title}</button>
  )
}

export default Button