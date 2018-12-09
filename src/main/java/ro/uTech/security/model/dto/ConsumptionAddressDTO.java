package ro.uTech.security.model.dto;

/**
 * Created by vlad.ginju on 12/11/17.
 */
public class ConsumptionAddressDTO {
    private String consumptionAddress;
    private String productType;


    public ConsumptionAddressDTO() {
    }

    public ConsumptionAddressDTO(String consumptionAddress, String productType) {
        this.consumptionAddress = consumptionAddress;
        this.productType = productType;
    }

    public String getConsumptionAddress() {
        return consumptionAddress;
    }

    public void setConsumptionAddress(String consumptionAddress) {
        this.consumptionAddress = consumptionAddress;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }
}
