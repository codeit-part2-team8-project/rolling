import { useRef, useState, useEffect } from 'react';
import {
  StyledSection,
  ProfileImgInput,
  FlexDiv,
  ProfileImgList,
  RoundImg,
} from './style';
import { fetchProfileImg } from '../Api/api';

const ProfileImgInputSection = ({ children, setProfileImageURL }) => {
  const imgRef = useRef();
  const [profileImgs, setProfileImgs] = useState([]);

  const handleChangeProfileImg = (e) => {
    imgRef.current.src = e.target.src;
    setProfileImageURL(e.target.src);
  };

  const getData = async () => {
    const { imageUrls } = await fetchProfileImg();
    setProfileImgs(imageUrls);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <StyledSection>
      <label htmlFor="profileImgURL">{children}</label>
      <ProfileImgInput>
        <img
          src={profileImgs[0]}
          alt="기본 프로필 이미지"
          width="80px"
          height="80px"
          ref={imgRef}
          className="selected-profile-img"
        />
        <FlexDiv>
          <span>프로필 이미지를 선택해 주세요!</span>
          <ProfileImgList>
            {profileImgs.map((img) => {
              return (
                <RoundImg
                  src={img}
                  alt="샘플 프로필 이미지"
                  onClick={handleChangeProfileImg}
                />
              );
            })}
          </ProfileImgList>
        </FlexDiv>
      </ProfileImgInput>
    </StyledSection>
  );
};

export default ProfileImgInputSection;
