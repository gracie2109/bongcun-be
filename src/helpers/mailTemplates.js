import moment from 'moment'
import { paramsStringify } from './queryParams';
import fs from 'fs';

const getVerificationEmailTemplate = ({
                                          redirectDomain,
                                          user,
                                          token,
                                          tokenId
                                      }) => {

    return {
        to: user.email,
        subject: `Kích hoạt tài khoản đăng nhập PETSHOP`,
        html: /* html */ `
			<div>
				<p>
					Thân gửi ${user.username}!
					<p>
						Người dùng nhận được mail vui lòng click vào <a href='${
            redirectDomain + '/api/auth/verify-account' + paramsStringify({ _roles: user.roles, _token: token,_id:tokenId })
        }'>link</a> này để xác thực tài khoản.
					</p>
					<i>Lưu ý: Mail xác thực này có hiệu lực trong vòng 7 ngày</i>
				</p>
				<hr>
				<p>
					<span style="display: block">Trân trọng!</span>
					<i>PETSHOP</i>
				</p>
			</div>
					`
    }
}

const getDeactivateUserEmail = (user) => {
    return {
        to: user.email,
        subject: 'PETSHOP thông báo vô hiệu hóa tài khoản người dùng.',
        html: /* html */ `
       <h4>PETSHOP xin thông báo.</h4>
       <p>
         Tài khoản của bạn đã bị vô hiệu hóa kể từ ngày ${moment().format('DD/MM/YYYY')}.
         Nếu có bất kỳ thắc mắc vui lòng liên hệ cho nhà trường theo số điện thoại 0xxx.xxx.xxx
         <hr style="width: 100%; height: 0.5px; background: #d1d5db">
         <i>Lưu ý: Đây là mail tự động, vui lòng không trả lời mail này.</i>
         <br>
         <b>Trân trọng</b>
         <br>
         <i>PETSHOP</i>
       </p>
      `
    }
}

// Hàm để đọc tệp và trả về dữ liệu dưới dạng base64
const readFileAsBase64 = (filePath) => {
    const fileData = fs.readFileSync(filePath);
    return fileData.toString('base64');
};
const sendScheduleServiceResponse = ({data}) => {

    return {
        to: data.email,
        subject: "Thông tin đăng ký dịch vụ chăm sóc pet cưng của bạn",
        html: /* html */ `
            <div style="width: 100%; overflow: hidden; ">
                <div style="display: grid;place-items: center;width: 100%">
               <div >
                   <div class="header_mail"
                    style="display: flex; justify-content: space-between"
                   >
                       <img src="https://ci3.googleusercontent.com/meips/ADKq_NZGSD9g6N1n3vqhbiXdeUz9CO9rvljGRxQQB2nlANCDSoUAte6UMjvmyF8dleFgP6zEPp2wUNaXfU8Co6YEQSZarnObdr4EM94jTnHKDe2bz9FxDinxyKn4_-NG5u8YqctaOsNPrIgs6h-BapTUequh=s0-d-e1-ft#https://bucket.mlcdn.com/a/1252/1252504/images/1daa2d79ac761042b291f047e182ce7078f17ffd.png" id="m_355141115288353997logoBlock-4" border="0" alt="" width="100" style="display:block" class="CToWUd" data-bit="iit">

                        <h3>PETSHOP</h3>

                   </div>
                   <div style="margin: 3rem 0;">
                       <p>Chúng tôi gửi mail để xác nhận đơn đăng ký dịch vụ <span style="color: orangered; font-weight: bold">${data.service}</span> cho thú cưng của bạn.</p>
                       <br/>
                       <p>Thông tin dịch vụ</p>
                       <div>
                            <ul>
                                <li style="margin: .5rem 0">SDT: <span><b>${data.phoneNumber}</b></span></li>
                                <li style="margin: .5rem 0">Dịch vụ cho: <span><b>${data.pet}</b></span></li>
                                <li style="margin: .5rem 0">Thời gian: <span><b>${data.date}, ${data.time}</b></span></li>
                                <li style="margin: .5rem 0">Loại dịch vụ: <span style="color: orangered; font-weight: bold">${data.service}</span></li>
                            </ul>
                       </div>
                   </div>

                   <div style="border:0.5px solid #dcdcdc; margin: 1rem 0">  </div>
                   <div>
                     <p style="line-height: 1.5rem">  Vui lòng đến đúng giờ, nếu có bất kỳ sự thay đổi nào, <br/>
                         hãy liên hệ với chúng tôi qua:</p>

                       <div style="display: flex;gap:12px">
                           <div id="section3">
                               <a href="tel:1-562-867-5309" target="_blank">
                                     <img src="cid:iphone" alt="">
                                    </a>
                           </div>
                            <div id="section">
                                 <a href="https://www.facebook.com/" target="_blank">
                                         <img src="cid:zalo" alt="">
                                    </a>
                            </div>
                           <div id="section2">
                                <a href="#" target="_blank">
                                        <img src="cid:facebook" alt="">
                                    </a>
                           </div>
                           <div id="discord">
                               <a href="#" target="_blank">
                                    <img src="cid:discord" alt="">
                               </a>
                           </div>
                       </div>
                   </div>
                   <div>
                       <p>Trân trọng,</p>
                       <small> *Quý khách vui lòng không trả lời email này*</small>
                   </div>
               </div>
           </div>
            </div>
     
      `,
        attachments: [
            {
                filename: 'discord.png',
                path: './public/discord.png',
                cid: 'discord'
            },
            {
                filename: 'facebook.png',
                path: './public/facebook.png',
                cid: 'facebook'
            },
            {
                filename: 'iphone.png',
                path: './public/iphone.png',
                cid: 'iphone'
            },
            {
                filename: 'zalo.png',
                path: './public/zalo.png',
                cid: 'zalo'
            },
        ]

    }
}

const forgotPasswordTemplate = ({data}) => {

    return {
        to: data.email,
        subject: "Thông tin đăng ký dịch vụ chăm sóc pet cưng của bạn",
        html: /* html */ `
            <div style="width: 100%; overflow: hidden; ">
                <div style="display: grid;place-items: center;width: 100%">
               <div >
                   <div class="header_mail"
                    style="display: flex; justify-content: space-between"
                   >
                       <img src="https://ci3.googleusercontent.com/meips/ADKq_NZGSD9g6N1n3vqhbiXdeUz9CO9rvljGRxQQB2nlANCDSoUAte6UMjvmyF8dleFgP6zEPp2wUNaXfU8Co6YEQSZarnObdr4EM94jTnHKDe2bz9FxDinxyKn4_-NG5u8YqctaOsNPrIgs6h-BapTUequh=s0-d-e1-ft#https://bucket.mlcdn.com/a/1252/1252504/images/1daa2d79ac761042b291f047e182ce7078f17ffd.png" id="m_355141115288353997logoBlock-4" border="0" alt="" width="100" style="display:block" class="CToWUd" data-bit="iit">

                        <h3>PETSHOP</h3>

                   </div>
                   <div style="margin: 3rem 0;">
                        <p>Dear ${data.user.username},</p><br />
                       <p>Please click here to change your password:</p><br />
                       <br/>
                        <a href=${data.recover_path} class="text-red-600">Here</a>
                   </div>

                   <div style="border:0.5px solid #dcdcdc; margin: 1rem 0">  </div>
                   <div>
                       <div style="display: flex;gap:12px">
                           <div id="section3">
                               <a href="tel:1-562-867-5309" target="_blank">
                                     <img src="cid:iphone" alt="">
                                    </a>
                           </div>
                            <div id="section">
                                 <a href="https://www.facebook.com/" target="_blank">
                                         <img src="cid:zalo" alt="">
                                    </a>
                            </div>
                           <div id="section2">
                                <a href="#" target="_blank">
                                        <img src="cid:facebook" alt="">
                                    </a>
                           </div>
                           <div id="discord">
                               <a href="#" target="_blank">
                                    <img src="cid:discord" alt="">
                               </a>
                           </div>
                       </div>
                   </div>
                   <div>
                       <p>Trân trọng,</p>
                       <small> *Quý khách vui lòng không trả lời email này*</small>
                   </div>
               </div>
           </div>
            </div>
     
      `,
        attachments: [
            {
                filename: 'discord.png',
                path: './public/discord.png',
                cid: 'discord'
            },
            {
                filename: 'facebook.png',
                path: './public/facebook.png',
                cid: 'facebook'
            },
            {
                filename: 'iphone.png',
                path: './public/iphone.png',
                cid: 'iphone'
            },
            {
                filename: 'zalo.png',
                path: './public/zalo.png',
                cid: 'zalo'
            },
        ]

    }
}


export { getVerificationEmailTemplate, getDeactivateUserEmail,sendScheduleServiceResponse ,forgotPasswordTemplate}
