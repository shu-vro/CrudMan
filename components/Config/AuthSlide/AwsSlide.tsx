import { useRef } from "react";
import { InputAuth } from ".";
// import { getSignatureKey } from "../../../utils/utils";
import HmacSHA256 from "crypto-js/hmac-sha256";

export default function AwsSlide() {
    const formRef = useRef(null);
    const getSignatureKey = (key, dateStamp, regionName, serviceName) => {
        var kDate = HmacSHA256(dateStamp, "AWS4" + key);
        var kRegion = HmacSHA256(regionName, kDate);
        var kService = HmacSHA256(serviceName, kRegion);
        var kSigning = HmacSHA256("aws4_request", kService);
        return kSigning;
    };
    let key = getSignatureKey(
        "AKIAIOSFODNN7EXAMPLE",
        "20150830",
        "us-east-1",
        "iam"
    );
    // console.log(key);
    return (
        <form className="slide Aws" ref={formRef}>
            <h3>Basic Authentication</h3>
            <InputAuth FieldName="Access Key" name="aws_access_key" />
            <InputAuth FieldName="Secret Key" name="aws_secret_key" />
            <InputAuth FieldName="Region" name="aws_region" />
            <InputAuth FieldName="Service" name="aws_service" />
            <InputAuth FieldName="Session Token" name="aws_session_token" />
        </form>
    );
}
