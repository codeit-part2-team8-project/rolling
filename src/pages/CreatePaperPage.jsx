import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Header from '../components/Header';
import CppCreateButton from '../components/CreatePaperPage/CppCreateButton';
import CppSelectButton from '../components/CreatePaperPage/CppSelectButton';
import CppShowDiv from '../components/CreatePaperPage/CppShowDiv';
import { getDataBackgroundImg, postUserData } from '../Api/api';

const CppForm = styled.form``;

const CppTopBox = styled.div`
  width: 720px;
  margin: 57px auto 0;
  .target {
    font-size: 24px;
    font-weight: 700;
    line-height: 42px;
    letter-spacing: -0.24px;
    margin-bottom: 12px;
  }
  .errorMessage {
    margin-top: 5px;
    color: red;
    text-indent: 2px;
  }
  @media (max-width: 1200px) {
    margin: 49px auto 0;
    .target {
      line-height: 36px;
    }
  }
  @media (max-width: 768px) {
    width: 320px;
    margin: 50px auto 0;
    .target {
      line-height: 36px;
    }
  }
`;
const CppNameInput = styled.input`
  width: 720px;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  &::placeholder {
    font-weight: 400;
    line-height: 26px;
    letter-spacing: -0.16px;
  }
  @media (max-width: 768px) {
    width: 320px;
  }
`;
const CppBotBox = styled.div`
  width: 720px;
  margin: 50px auto 0;

  & .text_box .title {
    color: #181818;
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: -0.24px;
  }

  & .text_box .text {
    color: #555;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: -0.16px;
  }
  @media (max-width: 1200px) {
    margin: 54px auto 0;
  }
  @media (max-width: 768px) {
    width: 320px;
    margin: 48px auto 0;
  }
`;

const CreatePaperPage = () => {
  const [isColor, setIsColor] = useState(true);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [backgroundImgs, setBackgroundImgs] = useState(null);
  const [selectImg, setSelectImg] = useState(null);
  const [selectColor, setSelectColor] = useState('beige');
  const navigate = useNavigate();

  const loadBackgroundImgData = async () => {
    const IMAGES = await getDataBackgroundImg();
    setBackgroundImgs(IMAGES);
  };

  useEffect(() => {
    loadBackgroundImgData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName) {
      setError('값을 입력해 주세요.');
      return;
    }
    setError(null);

    let sendData;
    if (isColor) {
      sendData = {
        team: '2-8',
        name: userName,
        backgroundColor: selectColor,
      };
    } else {
      sendData = {
        team: '2-8',
        name: userName,
        backgroundColor: selectColor,
        backgroundImageURL: selectImg,
      };
    }

    const { id } = await postUserData(sendData);
    navigate(`/post/${id}`);
  };

  const NameValueChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <>
      <Header hidden="true" />
      <main>
        <CppForm onSubmit={handleSubmit}>
          <CppTopBox className="recipient_name">
            <p className="target">To.</p>
            <CppNameInput
              value={userName}
              onChange={NameValueChange}
              placeholder="받는 사람 이름을 입력해 주세요"
            />
            {error && <p className="errorMessage">{error}</p>}
          </CppTopBox>
          <CppBotBox>
            <div className="text_box">
              <p className="title">배경화면을 선택해 주세요.</p>
              <p className="text">
                컬러를 선택하거나, 이미지를 선택할 수 있습니다.
              </p>
            </div>
            <div>
              <CppSelectButton setIsColor={setIsColor} isColor={isColor} />
              <CppShowDiv
                backgroundImgs={backgroundImgs}
                isColor={isColor}
                selectColor={selectColor}
                setSelectColor={setSelectColor}
                selectImg={selectImg}
                setSelectImg={setSelectImg}
              />
            </div>
            <CppCreateButton type="submit" />
          </CppBotBox>
        </CppForm>
      </main>
    </>
  );
};

export default CreatePaperPage;
