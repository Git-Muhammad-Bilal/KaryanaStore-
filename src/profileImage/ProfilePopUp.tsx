import React, { useEffect, useState, useRef } from 'react'
import axiosApi from '../axios/axiosApi'
import '../karyanaStoreStyless/profile.css'
import { useErrorBoundary } from 'react-error-boundary'
import { JsxElement } from 'typescript'
let url = 'http://localhost:3003'
const ProfilePopUp = ({ closePopUp, renderProfile, storeProfile, avatar }: {
    closePopUp: (b: boolean) => void, renderProfile: (fn: any) => any, storeProfile: {}, avatar: string
}) => {

    interface imgTypes {
        selectedImg: string | Blob | FileList | null
        urlUploadImg?: Blob | MediaSource
        File: string | File
    }

    const [uploadImg, setUploadImg] = useState<any>('');
    const [isSelctImg, setIsSelectImg] = useState<boolean>(false)
    const { showBoundary } = useErrorBoundary()
    const inputEle = useRef<any>(null)

                             
    function extractFile(e: React.ChangeEvent<HTMLInputElement>) {
        
         let img = inputEle.current?.files
        setUploadImg(img[0])

    }

    const callNotSelect = (): void => {
        setIsSelectImg(true)
    }


    function closepop(ev: MouseEvent) {

        let classNme = ev.target as HTMLLIElement


        if (!classNme.className.includes('pop') && classNme.className !== 'img') {
            closePopUp(false)
        }
    }

    useEffect(() => {

        document.body.addEventListener('click', closepop)

        return () => {
            document.body.removeEventListener('click', closepop)
        }
    }, [])



    async function saveProfile() {
        interface t {
            data: {
                filename: string
            }
        }
        let formData = new FormData()
        formData.append('profileImage', uploadImg)
        try {
            let { data } = await axiosApi.post('/uploadProfile', formData);
            console.log(data, 'dataaaaaa');
            let x = URL.createObjectURL(data)
            console.log('urllllllllll', x);
            
            renderProfile(data.filename)

        } catch (error) {
            showBoundary(error)

        }
        closePopUp(false)
    }


    async function removeProfile() {
        console.log(storeProfile);
        try {
            let { data } = await axiosApi.post(`/removeProfile/${storeProfile}`)
            console.log(data);
            renderProfile('')
            closePopUp(false)

        } catch (error) {
            showBoundary(error)
            closePopUp(true)
        }
    }



    function createSrc() {
        
        if (uploadImg) {
            return URL.createObjectURL(uploadImg)
        } else {

            // return storeProfile ? `${url}${storeProfile}` : avatar
            return  avatar
        }
    }


    return (
        <div className="pop-up-container">
            <div className="pu-profile-image-cont">
                <div className="pop  pu-profile-img">
                    <label className='pop' htmlFor="store-profile">
                        <img src={createSrc()}
                            alt="upload proile"
                            className='pop'
                        />

                    </label>
                    <input
                        ref={inputEle}
                        type="file"
                        className='pop'
                        id="store-profile"
                        accept='image/*'
                        onChange={( e: React.ChangeEvent<HTMLInputElement> )=>{extractFile(e)}}
                    />
                </div>

            </div>
            <div className="pop profile-buttons">
                <div className="pop submit-profile">
                    <button className='pop' onClick={uploadImg ? saveProfile : callNotSelect}>Save</button>
                </div>
                <div className="pop remove-profile">
                    <button onClick={removeProfile}>Remove</button>
                </div>

            </div>

            <div className={isSelctImg && !uploadImg ? 'pop select-img' : 'select-img-none'}>
                <span className='pop' style={{ color: 'red' }} >
                    {storeProfile ? 'Select a new profile!' : 'Please Select your profile!'}
                </span>
            </div>

            <div className='profile-title'>
                <h3>AAA Store!</h3>
            </div>
        </div>
    );

}

export default ProfilePopUp;
