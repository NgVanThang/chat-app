import { useState, useEffect } from 'react';

import { GetConfigLayout } from '~/context/configProvider';

const useTime = (time = new Date(), now = new Date()) => {
  const {
    languageOption: { languageSelected, getLanguageValue },
  } = GetConfigLayout();

  const [timeString, setTimeString] = useState(getLanguageValue(languageSelected, 'vaiGiayTruoc'));

  useEffect(() => {
    const timeParameter = new Date(time);

    if (time < now) {
      const timeDifference = now - timeParameter;
      setTimeString(() => {
        const differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        if (differenceInDays > 0) {
          if (differenceInDays < 20) {
            return differenceInDays + ' ' + getLanguageValue(languageSelected, 'ngayTruoc');
          } else {
            return `${timeParameter.getDate()}-${timeParameter.getMonth() + 1}-${timeParameter.getFullYear()}`;
          }
        } else {
          const differenceInHours = Math.floor(timeDifference / (1000 * 60 * 60));
          if (differenceInHours > 0) {
            return differenceInHours + ' ' + getLanguageValue(languageSelected, 'gioTruoc');
          } else {
            const differenceInMinutes = Math.floor(timeDifference / (1000 * 60));

            if (differenceInMinutes > 0) {
              return differenceInMinutes + ' ' + getLanguageValue(languageSelected, 'phutTruoc');
            } else {
              return getLanguageValue(languageSelected, 'vaiGiayTruoc');
            }
          }
        }
      });
    }
  }, [time, now, languageSelected, getLanguageValue]);

  return timeString;
};

export default useTime;
