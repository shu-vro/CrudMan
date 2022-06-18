import { useRef } from "react";
import { InputAuth } from ".";

export default function OAuth2Slide() {
    const formRef = useRef(null);

    return (
        <form className="slide authSlide OAuth2" ref={formRef}>
            <h3>OAuth 2 Authentication</h3>
            <InputAuth FieldName="Access Token" name="oauth_access_token" />
            <InputAuth
                FieldName="Token Prefix"
                name="oauth_access_token_prefix"
            />
            <h3>Generate New Token</h3>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                <label htmlFor="oauth_grant_type">Grant Type</label>
                <select
                    name="oauth_grant_type"
                    id="oauth_grant_type"
                    className="select-transparent">
                    <option value="code">Authorization Code</option>
                    <option value="code">Client Credentials</option>
                    <option value="code">Password Credentials</option>
                </select>
            </div>
            <InputAuth FieldName="Auth Url" name="oauth_auth_url" />
            <InputAuth FieldName="Token Url" name="oauth_token_url" />
            <InputAuth
                FieldName="Callback Url"
                name="oauth_callback_url"
                FieldValue="https://localhost:3000/callback"
            />
            <InputAuth FieldName="Client Id" name="oauth_client_id" />
            <InputAuth FieldName="Client Secret" name="oauth_client_secret" />
            <InputAuth FieldName="Scope" name="oauth_scope" />
            <InputAuth FieldName="State" name="oauth_state" />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                <label htmlFor="oauth_send_auth">Send Auth</label>
                <select
                    name="oauth_send_auth"
                    id="oauth_send_auth"
                    className="select-transparent">
                    <option value="code">As Auth Header</option>
                    <option value="code">As Request Body</option>
                </select>
            </div>
            <button
                className="add-row-button"
                style={{
                    margin: "20px auto",
                }}>
                Generate Token
            </button>
        </form>
    );
}
