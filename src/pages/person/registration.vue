<template>
	<view class="content">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :label-position="labelPosition" label="账号" prop="account">
				<u-input :border="border" placeholder="请输入账号" v-model="model.account" type="text"></u-input>
			</u-form-item>

			<u-form-item :label-position="labelPosition" label="密码" prop="password">
				<u-input :password-icon="true" :border="border" type="password" v-model="model.password" placeholder="请输入密码"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="确认密码" label-width="150" prop="rePassword">
				<u-input :border="border" type="password" v-model="model.rePassword" placeholder="请确认密码"></u-input>
			</u-form-item>

			<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="email" :label-position="labelPosition" label="邮箱号" prop="email" label-width="150">
				<u-input :border="border" placeholder="请输入邮箱号" v-model="model.email" type="email"></u-input>
			</u-form-item>
		</u-form>

		<button type="primary" @click="submit">注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					account: '',
					password: '',
					rePassword: '',
					email: ''
				},
				labelPosition: 'left',
				border: false,
				errorType: ['message'],
				rules: {
					account: [
						{
							required: true,
							message: '请输入账号',
							trigger: 'blur'
						},
						{
							min: 9,
							max: 15,
							message: '长度在9到15个字符之间',
							trigger: ['change','blur']
						}
					],
					password: [
						{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							message: '长度在6个字符以上',
							trigger: ['change','blur']
						}
					],
					email: [
						{
							required: true,
							message: '请输入邮箱',
							trigger: ['blur']
						},
						{
							type: 'email',
							message: '请输入正确的邮箱号',
							trigger: ['blur']
						}
					]
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			submit(){
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						if(this.model.password == this.model.rePassword){
							let res = await this.$u.api.user.register(this.model)
							console.log(res)
							if(res.status == 1688){
								uni.showToast({
									title: '注册成功',
									duration: 1000
								})
								uni.navigateTo({
									url: "/pages/person/login"
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '注册失败',
									duration: 1000
								})
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: '两次输入密码不一致',
								duration: 1000
							})
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: '验证失败',
							duration: 1000
						})
					}
				})
			}
			// sendCode: function () {
			// 	this.codeBtn.waitingCode = true;
			// 	this.codeBtn.count = this.seconds;
			// 	this.codeBtn.text = this.codeBtn.count + 's';
				
			// 	let countdown = setInterval( () => {
			// 		this.codeBtn.count--;
			// 		this.codeBtn.text = this.codeBtn.count + 's';
			// 		if( this.codeBtn.count < 0 ){
			// 			clearInterval(countdown);
			// 			this.codeBtn.text = '重新发送';
			// 			this.codeBtn.waitingCode = false;
			// 		}
			// 	},1000);
			// },
		},
		// computed: {
		// 	disableCodeBtn: function (){
		// 		return this.codeBtn.waitingCode || this.captchaImg.length < 4;
		// 	} 
		// }
	}
</script>

<style lang="scss" scoped>
	$color-primary: $color;
	.content{
		padding: 60upx 100upx 100upx;
		background-color: #fff;
		height: 100vh;
	}
	.uni-form-item{
		margin-bottom: 40upx;
		padding: 0;
		border-bottom: 1px solid #e3e3e3;
		.uni-input{
			font-size: 30upx;
			padding: 7px 0;
		}
	}
	.column-with-btn{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		button{
			font-size: 24upx;
			margin: 0;
			width: 180upx;
			text-align: center;
			&:after{
				border: none
			}
			&.active{
				background-color: $color-primary;
				color: $uni-text-color-inverse;
			}
		}
	}
	button[type="primary"]{
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}
	.links{
		text-align: center;
		margin-top: 40upx;
		font-size: 26upx;
		color: #999;
		view{
			display: inline-block;
			vertical-align: top;
			margin: 0 10upx;
		}
		.link-highlight{
			color: $color-primary
		}
	}
</style>
