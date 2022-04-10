package com.examly.springapp.Models;

import java.util.Date;
import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "Expense")
public class ExpenseModel {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String expenseId;
    private int billNumber;
    @Lob
    private byte[] billImage;
    private int billCost;
    private Date datedOn;
    private String remark;
    private String description;
    private String status = "pending";
    @OneToOne
    @JoinColumn(name = "id")
    private UserModel claimedBy;
    private String reviewedBy;

    public ExpenseModel() {
    }

    public ExpenseModel(String expenseId, int billNumber, byte[] billImage, int billCost, Date datedOn, String remark,
                        String status, UserModel claimedBy, String reviewedBy) {
        this.expenseId = expenseId;
        this.billNumber = billNumber;
        this.billImage = billImage;
        this.billCost = billCost;
        this.datedOn = datedOn;
        this.remark = remark;
        this.status = status;
        this.claimedBy = claimedBy;
        this.reviewedBy = reviewedBy;
    }

    public String getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(String expenseId) {
        this.expenseId = expenseId;
    }

    public int getBillNumber() {
        return billNumber;
    }

    public void setBillNumber(int billNumber) {
        this.billNumber = billNumber;
    }

    public byte[] getBillImage() {
        return billImage;
    }

    public void setBillImage(byte[] billImage) {
        this.billImage = billImage;
    }

    public int getBillCost() {
        return billCost;
    }

    public void setBillCost(int billCost) {
        this.billCost = billCost;
    }

    public Date getDatedOn() {
        return datedOn;
    }

    public void setDatedOn(Date datedOn) {
        this.datedOn = datedOn;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public UserModel getClaimedBy() {
        return claimedBy;
    }

    public String getReviewedBy() {
        return reviewedBy;
    }

    public void setReviewedBy(String reviewedBy) {
        this.reviewedBy = reviewedBy;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setClaimedBy(UserModel claimedBy) {
        this.claimedBy = claimedBy;
    }

}
