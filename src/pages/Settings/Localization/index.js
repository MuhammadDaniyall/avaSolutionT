import React from "react"
import TimeZone from "../../../components/Settings/Localization/TimeZone"
const Localization = (props) => {
    return <div className={'setting-form__wrapper waitlist-setting__form'}>
                <div className={'setting-form__header'}>Localization</div>
                <div className={'setting-form__body'}>
                    <TimeZone></TimeZone>
                </div>
            </div>
};
export default Localization;