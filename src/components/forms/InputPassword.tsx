import React, {ChangeEventHandler, useState} from "react";
import eye from '../../assets/eye.svg';
import eyeoff from '../../assets/eye-off.svg';

type InputPasswordType = {
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    label?: string
}
export default function InputPassword({value, onChange,label = 'Password'}: InputPasswordType) {
    const [showPassword, setShowPassword] = useState(false);
    return <div className="form-item">
        <label>{label}</label>
        <div className="password-input">
            <input
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                autoComplete="new-password"
                required
            />
            <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
            >
                <img
                  src={showPassword ? eye : eyeoff}
                  alt={showPassword ? 'Hide Password' : 'Show Password'}
                  width={20}
                  height={20}
                />
            </button>
        </div>
    </div>
}