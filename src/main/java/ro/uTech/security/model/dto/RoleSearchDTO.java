package ro.uTech.security.model.dto;

public class RoleSearchDTO {

    private String query;

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    @Override
    public String toString() {
        return "RoleSearchDTO{" +
                "query='" + query + '\'' +
                '}';
    }
}
