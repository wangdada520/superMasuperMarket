<template>
    <div class="password-modify">
        <el-card class="box-card">
            <!-- 标题 -->
            <div slot="header" class="clearfix">
                <h2>修改账户密码</h2>
            </div>
            <!-- 内容 -->
            <div class="text item">
                <el-form :model="psdForm" status-icon :rules="rules" ref="psdForm" label-width="100px" class="demo-psdForm" style="width:480px;">
                    <el-form-item label="原账户" prop="oldpass">
                        <el-input type="text" v-model="psdForm.account" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newpass">
                        <el-input type="text" v-model="psdForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="checkPass">
                        <el-input type="text" v-model="psdForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        // 确认密码自定义验证
        var confirmPassword = (rule, value, callback) => {
        if (value === "") {
            callback(new Error("不能为空"));
        } else if (value !== this.psdForm.pass) {
            callback(new Error("两次密码不一致"));
        } else {
            callback();
        }
        };
        // 密码自定义验证
        var checkPassword = (rule, value, callback) => {
        if (value === "") {
            callback(new Error("不能为空"));
        } else if (value.length < 3 || value.length > 6) {
            callback(new Error("密码在 3~6 位之间"));
        } else if (!passwordReg(value)) {
            callback(new Error("密码必须是数字和字母组合"));
        } else {
            if (this.psdForm.checkPass !== "") {
            this.$refs.psdForm.validateField("checkPass");
            }
            callback();
        }
        };
        return {
            // 表单数据
            psdForm:{
                oldpass: "",
                newpass: "",
                checkPass: ""
            },
            // 验证规则
            rules: {
                // 账户
                oldpass: [
                { required: true, message: "请输入账户", trigger: "blur" },
                { min: 3, max: 6, message: "账户长度3-6", trigger: "blur" }
                ],
                // 密码
                newpass: [{ required: true, validator: checkPassword, trigger: "blur" }],
                // 确认密码
                checkPass: [
                { required: true, validator: confirmPassword, trigger: "blur" }
                ]
            }
        }
    },
    methods:{
        submitForm(){
            this.$refs.psdForm.validate(valid => {
                if (valid) {
                    let params = {
                        oldpass: this.psdForm.oldpass,
                        newpass: this.psdForm.newpass
                    };
                    alert("修改成功");
                    // this.$router.push("/home");
                } else {
                    console.log("前段验证不通过，不允许提交");
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="less">

</style>
