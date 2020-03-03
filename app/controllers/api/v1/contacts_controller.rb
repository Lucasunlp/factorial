class Api::V1::ContactsController < ApplicationController
  def index
    contact = Contact.all.order(created_at: :desc)
    render json: contact
  end

  def create
    contact = Contact.create(contact_params)
    if contact
      render json: contact
    else
      render json: contact.errors
    end
  end

  def show
    if contact
      render json: contact
    else
      render json: contact.errors
    end
  end

  def destroy
    contact&.destroy
    render json: { message: 'Contact deleted!' }
  end

  def update
    contact = Contact.find(params[:id])
    contact.update_attributes(contact_params)
    render json: contact
  end


  private

  def contact_params
    params.require(:contact).permit(:id, :contact, :first_name, :last_name, :phone, :email)
  end

  def contact
   @contact ||= Contact.find(params[:id])
  end
end
