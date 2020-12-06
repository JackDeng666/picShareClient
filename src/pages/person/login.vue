<template>
	<view class="content">
		<u-form :model="model" ref="uForm">
			<u-form-item :label-position="labelPosition" label="账号" prop="account">
				<u-input :border="border" placeholder="请输入账号或邮箱" v-model="model.account" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="密码" prop="password">
				<u-input :password-icon="true" :border="border" type="password" v-model="model.password" placeholder="请输入密码"></u-input>
			</u-form-item>
		</u-form>
		<button type="primary" @click="submit">登陆</button>
		<view class="links"><view class="link-highlight" @tap="gotoRegistration">注册账号</view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					account: '',
					password: ''
				},
				labelPosition: 'left',
				border: false,
			}
		},
		methods: {
			async submit(){
				let res = await this.$u.api.user.login(this.model)
				if(res.status == 1688){
					uni.setStorageSync('userInfo', res.data)
					uni.navigateBack({  
						delta: 1
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '登录失败',
						duration: 1000
					})
				}
			},
			gotoRegistration: function () {
				uni.navigateTo({url: '/pages/person/registration'})
			},
			// gotoForgetPassword: function () {
			// 	uni.navigateTo({url: 'forget-password'});
			// }
		}
	}
</script>

<style lang="scss" scoped>
	$color-primary: $color;
	.content{
		padding: 100upx;
		background-color: #fff;
		height: 100vh;
	}
	.logo{
	    text-align: center;
		image{
		    height: 200upx;
		    width: 200upx;
		    margin: 0 0 60upx;
		}
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
