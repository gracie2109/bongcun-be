export const orderStatuses = [
    {
        name: "PENDING",
        vi_desc: "Đơn hàng đã được đặt, nhưng vẫn chưa được xác nhận bởi người bán",
        eng_desc: "The order has been placed but is awaiting confirmation from the seller."
    },
    {
        name: "IN TRANSITING",
        vi_desc: "Hàng đã được lấy đi và đang trong quá trình giao hàng tới địa chỉ của người mua",
        eng_desc: "The order has been picked up and is currently being delivered to the buyer's address."
    },
    {
        name: "DELIVERED",
        vi_desc: "Hàng đã được giao thành công và đã nhận được bởi người mua",
        eng_desc: "The order has been successfully delivered and received by the buyer."
    },
    {
        name: "CANCELLED",
        vi_desc: "Đơn hàng đã bị huỷ bỏ do nhiều lý do khác nhau như yêu cầu của người mua, không thể giao hàng, hoặc từ chối đơn hàng",
        eng_desc: "The order has been cancelled due to various reasons such as buyer's request, inability to deliver, or order refusal."
    },
    {
        name: "Awaiting payment",
        vi_desc: "Đơn hàng đã được giao nhưng đang chờ người mua thanh toán",
        eng_desc: "The order has been delivered but is awaiting payment from the buyer."
    },

    {
        name: "EXCHANGE",
        vi_desc: "Đơn hàng đang được xử lý để được trả lại hoặc đổi hàng",
        eng_desc: "The order is being processed for return or exchange."
    },
    {
        name: "EXCHANGE COMPLETED",
        vi_desc: "Quá trình trả lại hoặc đổi hàng đã hoàn tất",
        eng_desc: "The return or exchange process has been completed."
    },
    {
        name: "COMPLETED",
        vi_desc: "Quá trình trả lại hoặc đổi hàng đã hoàn tất",
        eng_desc: "The return or exchange process has been completed."
    }
];


export const paymentStatus = {
    PENDING: "pending",
    PAID: "paid"
}

export const fulfillmentStatus = {
    NOT_FULFILLED: 'not fulfilled',
    FULFILLED:"fulfilled"
}