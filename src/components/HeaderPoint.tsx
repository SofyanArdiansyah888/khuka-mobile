import whitelogo from "../assets/khukha-white.svg";
import point from "../assets/diamond.png";
import cashback from "../assets/cashback.png";
import React, {ReactNode, useEffect, useState} from "react";
import useAuth from "../common/hooks/useAuth";
import {fetchPoin} from "../utils/api";
import {calculateMemberDuration} from "../utils/calculateDuration";

type HeaderPointType = {
    ukuran?: 'besar' | 'kecil',
    content?: ReactNode,
    onDataReceived?: (poin: number, cashback: number) => void; 
}
export default function HeaderPoint({ukuran = 'kecil',content, onDataReceived}: HeaderPointType) {
    const {getUser} = useAuth()
    const [user, setUser] = useState<any>(null)
    const [memberDuration, setMemberDuration] = useState<string>('');
    const [poinCashback, setPoinCashback] = useState<any>({total_poin: 0, total_cashback: 0});
    useEffect(() => {
        (async () => {
            const tempUser = await getUser()
            setUser(tempUser)
            const storedPoinCashback = await fetchPoin(tempUser.id);
            setPoinCashback(storedPoinCashback.data);
            
            if (onDataReceived) {
                onDataReceived(storedPoinCashback.data.total_poin, storedPoinCashback.data.total_cashback);
            }
            if (tempUser?.tgl_member) {
                const durationText = calculateMemberDuration(tempUser?.tgl_member);
                setMemberDuration(durationText);
            }
        })()
    }, []);


    if (ukuran === 'besar')
        return <div className="user-info-wrap akun-wrap">
            <div className="user-info">
                <div className="user-details">
                    <div className="user-avatar">
                        <img src={whitelogo} alt="User Logo"/>
                    </div>
                    <div className="user-data">
                        <h2>{user?.nama}</h2>
                        <p>Member sejak {memberDuration}</p>
                    </div>
                </div>
                <div className="points-balance">
                    <div className="points">
                        <img src={point} alt="Points"/>
                        <p>{poinCashback?.total_poin ?? 0} poin</p>
                    </div>
                    <div className="cashback">
                        <img src={cashback} alt="Cashback"/>
                        <p>
                            Rp.{new Intl.NumberFormat('id-ID').format(poinCashback?.total_cashback ?? 0)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    else
        return <div className="user-info-wrap">
            <div className="user-info">
                <div className="user-details">
                    <div className="user-avatar">
                        <img src={whitelogo} alt="User Logo"/>
                    </div>
                    <div className="user-data">
                        <h2>{user?.nama}</h2>
                        <p>Member sejak {memberDuration}</p>
                    </div>
                </div>
                <div className="points-balance">
                    <div className="points">
                        <img src={point} alt="Points"/>
                        <p>{poinCashback?.total_poin ?? 0} poin</p>
                    </div>
                    <div className="cashback">
                        <img src={cashback} alt="Cashback"/>
                        <p>
                            Rp.
                            {new Intl.NumberFormat('id-ID').format(
                                poinCashback?.total_cashback ?? 0
                            )}
                        </p>
                    </div>
                </div>
            </div>
            {content}
        </div>
}