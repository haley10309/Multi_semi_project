SELECT
    MOVIE_ID,
    TITLE,
    DESCRIPTION,
    DIRECTOR,
    ACTORS,
    RELEASEDATE,
    AVERAGERATING,
    IMG_URL
FROM
    MOVIE
WHERE
    MOVIE_ID = NUMBER;

UPDATE MOVIE
SET
    TITLE = '시민덕희',
    DESCRIPTION = '화재 사건으로 세탁소를 잃은 싱글맘 덕희는 어느날 선불 대출을 제안하는 은행의 전화를 받게 된다. 은행의 제안에 돈을 송금한 덕희, 그러나 얼마 지나지 않아 자신이 보이스 피싱의 피해자가 되었다는 사실을 깨닫게 된다. 망연자실한 덕희는 경찰에게 도움을 요청하며 돌아서지만, 자신의 돈을 찾을 방법이 없다는 사실에 더욱 좌절하는데...',
    DIRECTOR = '박영주',
    ACTORS = '라미란 공명 안은진',
    AVERAGERATING = 3.5
WHERE
    MOVIE_ID = 2;

    SELECT * FROM movie;

    UPDATE MOVIE
    SET TITLE = '웡카',
    DESCRIPTION = '화려한 업적을 이루기 전의 어린 시절, 모험을 떠난 윌리 웡카가 움파룸파 가족을 만나게 된 이야기가 펼쳐진다.',
    DIRECTOR = '폴 킹',
    ACTORS = '티모시 샬라메, 휴 그랜트',
    AVERAGERATING = 4.5
    WHERE
    MOVIE_ID = 1;

UPDATE MOVIE
SET 
TITLE = '랜드 오브 배드',
DESCRIPTION = '라스베이거스 공군 기지의 베테랑 드론 조종사 리퍼 는 델타포스 티어-원 부대의 CIA 요원 구출작전 지원임무를 맡게 된다. 슈가, 아벨 이 이끄는 티어-원 부대는 CIA 요원이 사라진 필리핀 남서부, 미스터리한 지형의 홀로 섬 정찰에 나서고, 이 위험천만한 작전을 위해 JTAC 신입요원 키니와 실전 경험이 많은 군인 비숍 까지 합류한다.',
DIRECTOR = '윌리엄 유뱅크',
ACTORS = '러셀 크로우 , 리암 햄스워스',
IMG_URL = 'https://img.megabox.co.kr/SharedImg/2024/02/19/KdYopYfSwypsx6vJeG7V605K7PBxNu6D_420.jpg'
WHERE MOVIE_ID = 4;

UPDATE MOVIE
SET AVERAGERATING =  2.5
WHERE MOVIE_ID =4;

UPDATE MOVIE
SET
TITLE ='SPY x FAMILY',
DESCRIPTION = '서로의 정체를 숨긴 채 결성된 위장 가족의 아버지 로이드(스파이)와 어머니 요르(암살자), 딸 아냐(초능력자)는 각자의 목표를 위해 비밀스러운 임무를 수행한다. 오퍼레이션 <올빼미> 작전을 위해 첫 가족 여행을 떠나던 중, 아냐는 열차 안에서 수상한 캐리어를 발견하고 그 안의 초콜릿을 실수로 그만 삼켜버리고 마는데…',
DIRECTOR ='카타가리 타카시',
ACTORS = '에구치 타쿠야, 타네자키 아츠미, 하야미 사오리, 마츠다 켄이치로',
IMG_URL = 'https://img.megabox.co.kr/SharedImg/2024/02/23/OpnH8Ij41oqrmeV7kZ9EBnDs2F9H9Oye_420.jpg',
AVERAGERATING = '3.4'
WHERE MOVIE_ID =5;

UPDATE MOVIE
SET
TITLE = '밥 말리 : 원 러브',
DESCRIPTION = '오랜 분열로 혼란스러운 시기에 빠진 자메이카 국민들을 위로하기 위해 스마일 자메이카 콘서트를 준비하던 ‘밥 말리’는 총격을 입고 영국으로 망명을 택한다. 런던에서 지내며 사랑과 평화, 공존의 메시지를 담은 ’엑소더스’ 앨범을 발매하고 전세계가 열광하는 아이콘이 된 ’밥 말리‘. 그는 생명의 위협에도 불구하고 다시 한번 자메이카 국민들 앞에서 평화를 노래하는 콘서트를 열기 위해 무대에 오르는데…',
DIRECTOR = '레이날도 마커스 그린',
ACTORS = '킹슬리 벤-어디어, 라샤냐 린치, 제임스 노턴',
IMG_URL = 'https://img.megabox.co.kr/SharedImg/2024/02/21/a2XXISmO0pie7WCY1zIutiVndieMeZBW_420.jpg',
AVERAGERATING = 4.5
WHERE MOVIE_ID = 6;

UPDATE MOVIE 
SET
TITLE ='가여운 것들',
DESCRIPTION ='천재적이지만 특이한 과학자 갓윈 백스터(윌렘 대포)에 의해 새롭게 되살아난 벨라 백스터(엠마 스톤). 갓윈의 보호를 받으며 성장하던 벨라는 날이 갈수록 세상에 대한 호기심과 새로운 경험에 대한 갈망이 넘쳐난다. 아름다운 벨라에게 반한 짓궂고 불손한 바람둥이 변호사 덩컨 웨더번(마크 러팔로)이 더 넓은 세계를 탐험하자는 제안을 하자, 벨라는 새로운 경험에 대한 갈망으로 대륙을 횡단하는 여행을 떠나고 처음 보는 광경과 새롭게 만난 사람들을 통해 놀라운 변화를 겪게 되는데….',
DIRECTOR = '요르고스 란티모스',
ACTORS = '엠마 스톤, 마크 러팔로, 윌렘 데포',
IMG_URL ='https://img.megabox.co.kr/SharedImg/2024/03/08/2MQEG7CWIkZuekOIErgQU12isYQhKTbQ_420.jpg',
AVERAGERATING = 4.1
WHERE MOVIE_ID = 7;

UPDATE MOVIE
SET
TITLE = '메이 디셈버',
DESCRIPTION = '“왜 날 연기하고 싶어요?”“전 이해하기 어려운 캐릭터가 좋아요”신문 1면을 장식하며 미국을 떠들썩하게 만든 충격적인 로맨스의 주인공들인 ‘그레이시’(줄리안 무어)와 그보다 23살 어린 남편 ‘조’(찰스 멜튼). 20여 년이 흐른 어느 날, 영화에서 그레이시를 연기하게 된 인기 배우 ‘엘리자베스’(나탈리 포트만)가 캐릭터 연구를 위해 그들의 집에 머물게 된다. 부부의 일상과 사랑을 깊숙이 들여다보는 엘리자베스의 시선과 과거의 진실을 파헤치는 그의 잇따른 질문들이 세 사람 사이에 균열을 가져오는데...',
DIRECTOR = '토드 헤인즈',
ACTORS = '나탈리 포트만, 줄리안 무어, 찰스 멜튼',
IMG_URL = 'https://img.megabox.co.kr/SharedImg/2024/02/19/wzEOuKO6lJHmGqtwa1pnWYKewQ4kefqj_420.jpg',
AVERAGERATING = 3.8
WHERE MOVIE_ID = 8;