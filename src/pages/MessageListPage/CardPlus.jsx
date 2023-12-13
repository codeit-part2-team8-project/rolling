import Create from '../../assets/images/plus.png';
import { CardContiner, CreateButton } from '../Header/MessageListPageCss';

// a태그는 /post/{id}/message 여기로 이동할수 있도록.
// 1은 예시
const CardPlus = () => {
  return (
    <CardContiner>
      <a href="/post/1/message" target="_blank">
        <CreateButton>
          <img src={Create} alt="+버튼" />
        </CreateButton>
      </a>
    </CardContiner>
  );
};

export default CardPlus;
