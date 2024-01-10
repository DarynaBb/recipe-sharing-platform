import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function AddRecipeForm() {
    const {
        addRecipe,
        isAddingRecipe, setIsAddingRecipe,
        nameInput, setNameInput,
        produkten, setProdukten,
        steps, setSteps,
        time, setTime,
        difficulty, setDifficulty,
        selectedRecipeId, image, setImage, isEditingRecipe, setIsEditingRecipe} = useContext(UserContext);
        
    return (
        <section className={`${isAddingRecipe || isEditingRecipe ? "block " : "hidden"} mt-[50px] mb-[20px]`}>
            <h4 className='text-[32px] text-center'>My new recipe</h4>
            <form action="" className={`flex flex-col items-center justify-center gap-[10px] mt-[50px]` }>
                <div className='py-[16px] bg-pinkF5 pl-[10px]'>
                    <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Photo*"
                    className='lg:min-w-[580px] md:min-w-[400px] min-w-[250px] bg-pinkF5 text-black outline-none placeholder:text-black text-[14px] tracking-[1px] uppercase'
                    />
                </div>
                <div className='py-[16px] bg-pinkF5 pl-[10px]'>
                    <input
                        type="text"
                        placeholder="title*"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className='bg-pinkF5 lg:min-w-[580px] md:min-w-[400px] min-w-[250px] text-black outline-none placeholder:text-black text-[14px] tracking-[1px] uppercase'
                        />
                </div>
                <div className='py-[16px] bg-pinkF5 pl-[10px]'>
                    <textarea
                    placeholder="ingredients*"
                    value={produkten}
                    onChange={(e) => setProdukten(e.target.value)}
                    rows="10"
                    cols="20"
                    className='bg-pinkF5 lg:min-w-[580px] md:min-w-[400px] min-w-[250px] text-black outline-none placeholder:text-black text-[14px] tracking-[1px] uppercase resize-none'
                    />
                </div>
                <div className='py-[16px] bg-pinkF5 pl-[10px] '>
                    <textarea
                        type="text"
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        placeholder="Steps*"
                        rows="10"
                        cols="20"
                        className='lg:min-w-[580px] md:min-w-[400px] min-w-[250px] resize-none bg-pinkF5 text-black outline-none placeholder:text-black text-[14px] tracking-[1px] uppercase'
                        />
                </div>
                <div className='py-[16px] bg-pinkF5 pl-[10px]'>
                    <input
                        type="number"
                        min="0"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="time*"
                        className='bg-pinkF5 lg:min-w-[580px] md:min-w-[400px] min-w-[250px] text-black outline-none placeholder:text-black text-[14px] tracking-[1px] uppercase'
                        />
                </div>
                <div className='py-[16px] bg-pinkF5 pl-[10px] mb-[40px]'>
                <select
                    placeholder="Difficulty*"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className='bg-pinkF5 lg:min-w-[580px] md:min-w-[400px] min-w-[250px] text-black outline-none placeholder-black text-[14px] tracking-[1px] uppercase'
                    >
                    <option value="">Difficulty*</option>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="difficult">difficult</option>
                </select>
                </div>
                <div className='flex flex-center flex-col md:flex-row gap-[10px] md:gap-[20px]'>
                    <button className='border-[1px] border-black px-[20px] py-[5px] md:px-[40px] md:py-[10px] uppercase text-[14px] font-poppins-semi-bold tracking-[1px] hover:bg-black hover:text-white' onClick={addRecipe}>{selectedRecipeId ? "update" : "add"} my recipe</button>
                    <button className='border-[1px] border-black px-[20px] py-[5px] md:px-[40px] md:py-[10px] uppercase text-[14px] font-poppins-semi-bold tracking-[1px] transition-all hover:bg-black hover:text-white' onClick={() => { setIsAddingRecipe(false); setIsEditingRecipe(false);}}>cancel</button>
                </div>
            </form>
        </section>
    )
}

export default AddRecipeForm