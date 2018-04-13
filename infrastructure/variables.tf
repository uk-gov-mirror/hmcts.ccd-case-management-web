variable "product" {
  type                  = "string"
  default               = "ccd"
  description           = "The name of your application"
}

variable "location" {
  type                  = "string"
  default               = "UK South"

}

variable "env" {
  type                  = "string"
  description           = "(Required) The environment in which to deploy the application infrastructure."
}

variable "ilbIp" {}

variable "subscription" {}

variable "tenant_id" {
  description = "(Required) The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault. This is usually sourced from environment variables and not normally required to be specified."
}

variable "jenkins_AAD_objectId" {
  type                        = "string"
  description                 = "(Required) The Azure AD object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies."
}

variable "idam_authentication_web_url" {
  default = "https://idam-test.dev.ccidam.reform.hmcts.net"
}

variable "ccd_gateway_url" {
  default = "https://gateway-ccd.nonprod.platform.hmcts.net"
}

variable "document_management_url" {
  default = "https://api-gateway.test.dm.reform.hmcts.net"
}

variable "ccd_print_service_url" {
  default = "https://return-case-doc-ccd.nonprod.platform.hmcts.net"
}

variable "external_host_name" {
  default = "ccd-case-management-web.nonprod.platform.hmcts.net"
}

