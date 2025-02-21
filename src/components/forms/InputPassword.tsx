import React, {ChangeEventHandler, useState} from "react";

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
                {showPassword ? 'Tutup' : 'Lihat'}
            </button>
        </div>
    </div>
}